data "aws_cognito_user_pools" "this" {
  name = "shopping_list_user_pool"
}

resource "aws_cognito_user_pool_client" "prod_client" {
  name = "prod_client"

  user_pool_id    = tolist(data.aws_cognito_user_pools.this.ids)[0]
  generate_secret = false

  callback_urls                        = ["https://${aws_cloudfront_distribution.this.domain_name}/login-callback"]
  logout_urls                          = ["https://${aws_cloudfront_distribution.this.domain_name}/logout-callback"]
  allowed_oauth_flows_user_pool_client = true
  allowed_oauth_flows                  = ["code"]
  allowed_oauth_scopes                 = ["email", "openid", "profile"]
  supported_identity_providers         = ["COGNITO"]
  prevent_user_existence_errors        = "ENABLED"
}

resource "aws_cognito_user_pool_ui_customization" "local_ui" {
  client_id    = aws_cognito_user_pool_client.prod_client.id
  image_file   = filebase64("${path.module}/${var.app_logo_path}")
  user_pool_id = tolist(data.aws_cognito_user_pools.this.ids)[0]
}