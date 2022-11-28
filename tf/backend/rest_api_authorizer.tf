data "aws_cognito_user_pools" "this" {
  name = "shopping_list_user_pool"
}

resource "aws_api_gateway_authorizer" "this" {
  name          = "shopping_list_authorizer"
  type          = "COGNITO_USER_POOLS"
  rest_api_id   = aws_api_gateway_rest_api.this.id
  provider_arns = data.aws_cognito_user_pools.this.arns
}

resource "aws_cognito_resource_server" "this" {
  name       = "shopping_list_api"
  identifier = aws_api_gateway_stage.this.invoke_url

  user_pool_id = tolist(data.aws_cognito_user_pools.this.ids)[0]
}