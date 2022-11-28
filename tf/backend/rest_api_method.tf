module "items_get_api_method" {
  source                       = "../modules/api_method"
  api_id                       = aws_api_gateway_rest_api.this.id
  resource_id                  = module.items.resource_id
  resource_path                = module.items.path
  http_method_type             = "GET"
  authorizer_id                = aws_api_gateway_authorizer.this.id
  lambda_function_name         = module.list_shopping_items_lambda.function_name
  lambda_invoke_arn            = module.list_shopping_items_lambda.invoke_arn
  execution_arn                = aws_api_gateway_rest_api.this.execution_arn
  integration_request_template = <<EOF
    {
      "user" : {
        "sub" : "$context.authorizer.claims.sub",
        "email" : "$context.authorizer.claims.email"
      }
    }
    EOF
}

module "items_post_api_method" {
  source                       = "../modules/api_method"
  api_id                       = aws_api_gateway_rest_api.this.id
  resource_id                  = module.items.resource_id
  resource_path                = module.items.path
  http_method_type             = "POST"
  authorizer_id                = aws_api_gateway_authorizer.this.id
  lambda_function_name         = module.create_edit_shopping_item_lambda.function_name
  lambda_invoke_arn            = module.create_edit_shopping_item_lambda.invoke_arn
  execution_arn                = aws_api_gateway_rest_api.this.execution_arn
  integration_request_template = <<EOF
    {
      "body": $input.json("$"),
      "user" : {
        "sub" : "$context.authorizer.claims.sub",
        "email" : "$context.authorizer.claims.email"
      }
    }
    EOF
}

module "item_id_delete_api_method" {
  source                       = "../modules/api_method"
  api_id                       = aws_api_gateway_rest_api.this.id
  resource_id                  = module.item_id.resource_id
  resource_path                = module.item_id.path
  http_method_type             = "DELETE"
  authorizer_id                = aws_api_gateway_authorizer.this.id
  lambda_function_name         = module.delete_shopping_item_lambda.function_name
  lambda_invoke_arn            = module.delete_shopping_item_lambda.invoke_arn
  execution_arn                = aws_api_gateway_rest_api.this.execution_arn
  integration_request_template = <<EOF
    {
      "itemId": $input.params().path.itemId,
      "user" : {
        "sub" : "$context.authorizer.claims.sub",
        "email" : "$context.authorizer.claims.email"
      }
    }
    EOF
}

module "item_id_put_api_method" {
  source                       = "../modules/api_method"
  api_id                       = aws_api_gateway_rest_api.this.id
  resource_id                  = module.item_id.resource_id
  resource_path                = module.item_id.path
  http_method_type             = "PUT"
  authorizer_id                = aws_api_gateway_authorizer.this.id
  lambda_function_name         = module.create_edit_shopping_item_lambda.function_name
  lambda_invoke_arn            = module.create_edit_shopping_item_lambda.invoke_arn
  execution_arn                = aws_api_gateway_rest_api.this.execution_arn
  integration_request_template = <<EOF
    {
      "body" : $input.json('$'),
      "itemId": $input.params().path.itemId,
      "user" : {
        "sub" : "$context.authorizer.claims.sub",
        "email" : "$context.authorizer.claims.email"
      }
    }
    EOF
}
