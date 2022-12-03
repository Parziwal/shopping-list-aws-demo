module "list_get_method" {
  source                       = "../modules/api_method"
  api_id                       = aws_api_gateway_rest_api.this.id
  resource_id                  = module.list.resource_id
  resource_path                = module.list.path
  http_method_type             = "GET"
  authorizer_id                = aws_api_gateway_authorizer.this.id
  lambda_function_name         = module.list_shopping_lists_lambda.function_name
  lambda_invoke_arn            = module.list_shopping_lists_lambda.invoke_arn
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

module "list_post_method" {
  source                       = "../modules/api_method"
  api_id                       = aws_api_gateway_rest_api.this.id
  resource_id                  = module.list.resource_id
  resource_path                = module.list.path
  http_method_type             = "POST"
  authorizer_id                = aws_api_gateway_authorizer.this.id
  lambda_function_name         = module.create_shopping_list_lambda.function_name
  lambda_invoke_arn            = module.create_shopping_list_lambda.invoke_arn
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

module "list_delete_method" {
  source                       = "../modules/api_method"
  api_id                       = aws_api_gateway_rest_api.this.id
  resource_id                  = module.list_id.resource_id
  resource_path                = module.list_id.path
  http_method_type             = "DELETE"
  authorizer_id                = aws_api_gateway_authorizer.this.id
  lambda_function_name         = module.delete_shopping_list_lambda.function_name
  lambda_invoke_arn            = module.delete_shopping_list_lambda.invoke_arn
  execution_arn                = aws_api_gateway_rest_api.this.execution_arn
  integration_request_template = <<EOF
    {
      "listId": $input.params().path.listId,
      "user" : {
        "sub" : "$context.authorizer.claims.sub",
        "email" : "$context.authorizer.claims.email"
      }
    }
    EOF
}

module "add_user_to_list_post_method" {
  source                       = "../modules/api_method"
  api_id                       = aws_api_gateway_rest_api.this.id
  resource_id                  = module.list_id_add_user.resource_id
  resource_path                = module.list_id_add_user.path
  http_method_type             = "POST"
  authorizer_id                = aws_api_gateway_authorizer.this.id
  lambda_function_name         = module.add_user_to_shopping_list_lambda.function_name
  lambda_invoke_arn            = module.add_user_to_shopping_list_lambda.invoke_arn
  execution_arn                = aws_api_gateway_rest_api.this.execution_arn
  integration_request_template = <<EOF
    {
      "listId": $input.params().path.listId,
      "body": $input.json("$"),
      "user" : {
        "sub" : "$context.authorizer.claims.sub",
        "email" : "$context.authorizer.claims.email"
      }
    }
    EOF
}

module "remove_user_from_list_post_method" {
  source                       = "../modules/api_method"
  api_id                       = aws_api_gateway_rest_api.this.id
  resource_id                  = module.list_id_remove_user.resource_id
  resource_path                = module.list_id_remove_user.path
  http_method_type             = "POST"
  authorizer_id                = aws_api_gateway_authorizer.this.id
  lambda_function_name         = module.remove_user_from_shopping_list_lambda.function_name
  lambda_invoke_arn            = module.remove_user_from_shopping_list_lambda.invoke_arn
  execution_arn                = aws_api_gateway_rest_api.this.execution_arn
  integration_request_template = <<EOF
    {
      "listId": $input.params().path.listId,
      "body": $input.json("$"),
      "user" : {
        "sub" : "$context.authorizer.claims.sub",
        "email" : "$context.authorizer.claims.email"
      }
    }
    EOF
}

module "item_get_method" {
  source                       = "../modules/api_method"
  api_id                       = aws_api_gateway_rest_api.this.id
  resource_id                  = module.list_id_item.resource_id
  resource_path                = module.list_id_item.path
  http_method_type             = "GET"
  authorizer_id                = aws_api_gateway_authorizer.this.id
  lambda_function_name         = module.list_shopping_items_lambda.function_name
  lambda_invoke_arn            = module.list_shopping_items_lambda.invoke_arn
  execution_arn                = aws_api_gateway_rest_api.this.execution_arn
  integration_request_template = <<EOF
    {
      "listId": $input.params().path.listId,
      "user" : {
        "sub" : "$context.authorizer.claims.sub",
        "email" : "$context.authorizer.claims.email"
      }
    }
    EOF
}

module "item_post_method" {
  source                       = "../modules/api_method"
  api_id                       = aws_api_gateway_rest_api.this.id
  resource_id                  = module.list_id_item.resource_id
  resource_path                = module.list_id_item.path
  http_method_type             = "POST"
  authorizer_id                = aws_api_gateway_authorizer.this.id
  lambda_function_name         = module.create_edit_shopping_item_lambda.function_name
  lambda_invoke_arn            = module.create_edit_shopping_item_lambda.invoke_arn
  execution_arn                = aws_api_gateway_rest_api.this.execution_arn
  integration_request_template = <<EOF
    {
      "listId": $input.params().path.listId,
      "body": $input.json("$"),
      "user" : {
        "sub" : "$context.authorizer.claims.sub",
        "email" : "$context.authorizer.claims.email"
      }
    }
    EOF
}

module "item_id_delete_method" {
  source                       = "../modules/api_method"
  api_id                       = aws_api_gateway_rest_api.this.id
  resource_id                  = module.list_id_item_id.resource_id
  resource_path                = module.list_id_item_id.path
  http_method_type             = "DELETE"
  authorizer_id                = aws_api_gateway_authorizer.this.id
  lambda_function_name         = module.delete_shopping_item_lambda.function_name
  lambda_invoke_arn            = module.delete_shopping_item_lambda.invoke_arn
  execution_arn                = aws_api_gateway_rest_api.this.execution_arn
  integration_request_template = <<EOF
    {
      "listId": $input.params().path.listId,
      "itemId": $input.params().path.itemId,
      "user" : {
        "sub" : "$context.authorizer.claims.sub",
        "email" : "$context.authorizer.claims.email"
      }
    }
    EOF
}

module "item_id_put_method" {
  source                       = "../modules/api_method"
  api_id                       = aws_api_gateway_rest_api.this.id
  resource_id                  = module.list_id_item_id.resource_id
  resource_path                = module.list_id_item_id.path
  http_method_type             = "PUT"
  authorizer_id                = aws_api_gateway_authorizer.this.id
  lambda_function_name         = module.create_edit_shopping_item_lambda.function_name
  lambda_invoke_arn            = module.create_edit_shopping_item_lambda.invoke_arn
  execution_arn                = aws_api_gateway_rest_api.this.execution_arn
  integration_request_template = <<EOF
    {
      "listId": $input.params().path.listId,
      "itemId": $input.params().path.itemId,
      "body" : $input.json('$'),
      "user" : {
        "sub" : "$context.authorizer.claims.sub",
        "email" : "$context.authorizer.claims.email"
      }
    }
    EOF
}
