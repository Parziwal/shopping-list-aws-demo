resource "aws_api_gateway_rest_api" "this" {
  name = "shopping_list_api"
}

module "list" {
  source    = "../modules/api_resource"
  api_id    = aws_api_gateway_rest_api.this.id
  parent_id = aws_api_gateway_rest_api.this.root_resource_id
  path_part = "list"
}

module "list_id" {
  source    = "../modules/api_resource"
  api_id    = aws_api_gateway_rest_api.this.id
  parent_id = module.list.resource_id
  path_part = "{listId}"
}

module "list_id_add_user" {
  source    = "../modules/api_resource"
  api_id    = aws_api_gateway_rest_api.this.id
  parent_id = module.list_id.resource_id
  path_part = "add-user"
}

module "list_id_remove_user" {
  source    = "../modules/api_resource"
  api_id    = aws_api_gateway_rest_api.this.id
  parent_id = module.list_id.resource_id
  path_part = "remove-user"
}

module "list_id_item" {
  source    = "../modules/api_resource"
  api_id    = aws_api_gateway_rest_api.this.id
  parent_id = module.list_id.resource_id
  path_part = "item"
}

module "list_id_item_id" {
  source    = "../modules/api_resource"
  api_id    = aws_api_gateway_rest_api.this.id
  parent_id = module.list_id_item.resource_id
  path_part = "{itemId}"
}

resource "aws_api_gateway_deployment" "this" {
  rest_api_id = aws_api_gateway_rest_api.this.id

  triggers = {
    redeployment = jsonencode([
      filemd5("${path.module}/rest_api.tf"),
      filemd5("${path.module}/rest_api_method.tf"),
      filemd5("${path.module}/rest_api_authorizer.tf"),
    ])
  }

  depends_on = [
    module.list_get_method.integration,
    module.list_post_method.integration,
    module.list_delete_method.integration,
    module.add_user_to_list_post_method.integration,
    module.remove_user_from_list_post_method.integration,
    module.item_get_method.integration,
    module.item_post_method.integration,
    module.item_id_put_method.integration,
    module.item_id_delete_method.integration,
  ]

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_api_gateway_stage" "this" {
  deployment_id = aws_api_gateway_deployment.this.id
  rest_api_id   = aws_api_gateway_rest_api.this.id
  stage_name    = "prod"
}