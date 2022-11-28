resource "aws_api_gateway_rest_api" "this" {
  name = "shopping_list_api"
}

module "items" {
  source    = "../modules/api_resource"
  api_id    = aws_api_gateway_rest_api.this.id
  parent_id = aws_api_gateway_rest_api.this.root_resource_id
  path_part = "items"
}

module "item_id" {
  source    = "../modules/api_resource"
  api_id    = aws_api_gateway_rest_api.this.id
  parent_id = module.items.resource_id
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
    module.items_get_api_method.integration,
    module.items_post_api_method.integration,
    module.item_id_put_api_method.integration,
    module.item_id_delete_api_method.integration
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