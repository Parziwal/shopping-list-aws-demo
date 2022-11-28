resource "aws_cognito_user_pool" "this" {
  name = "shopping_list_user_pool"

  username_attributes      = ["email"]
  auto_verified_attributes = ["email"]

  password_policy {
    minimum_length    = 8
    require_numbers   = true
    require_symbols   = true
    require_lowercase = true
    require_uppercase = true
  }

  account_recovery_setting {
    recovery_mechanism {
      name     = "verified_email"
      priority = 1
    }
  }

  schema {
    name                     = "name"
    attribute_data_type      = "String"
    developer_only_attribute = false
    mutable                  = true
    required                 = true
    string_attribute_constraints {
      min_length = 0                 
      max_length = 2048             
    }
  }
}

resource "aws_cognito_user_pool_domain" "this" {
  domain       = "shopping-list-auth"
  user_pool_id = aws_cognito_user_pool.this.id
}

resource "aws_cognito_user_pool_client" "local_client" {
  name = "local_client"

  user_pool_id    = aws_cognito_user_pool.this.id
  generate_secret = false

  callback_urls                        = ["http://localhost:4200/login-callback"]
  logout_urls                          = ["http://localhost:4200/logout-callback"]
  allowed_oauth_flows_user_pool_client = true
  allowed_oauth_flows                  = ["code"]
  allowed_oauth_scopes                 = ["email", "openid", "profile"]
  supported_identity_providers         = ["COGNITO"]
  prevent_user_existence_errors        = "ENABLED"
}

resource "aws_cognito_user_pool_ui_customization" "local_ui" {
  client_id    = aws_cognito_user_pool_client.local_client.id
  image_file   = filebase64("${path.module}/../assets/shopping-list-logo.png")
  user_pool_id = aws_cognito_user_pool_domain.this.user_pool_id
}