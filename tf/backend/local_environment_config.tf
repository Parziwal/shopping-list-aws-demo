data "aws_cognito_user_pool_clients" "this" {
  user_pool_id = tolist(data.aws_cognito_user_pools.this.ids)[0]
}

locals {
  client_id = data.aws_cognito_user_pool_clients.this.client_ids[index(data.aws_cognito_user_pool_clients.this.client_names, "local_client")]
}

resource "local_file" "environment_config" {
  content = templatefile("${path.module}/../../frontend/src/environments/environment.template.ts", {
    apiUrl     = aws_api_gateway_stage.this.invoke_url,
    cognitoUrl = "https://cognito-idp.${var.region}.amazonaws.com/${tolist(data.aws_cognito_user_pools.this.ids)[0]}",
    clientId   = local.client_id,
    clientUrl  = "http://localhost:4200",
    }
  )
  filename = "${path.module}/../../frontend/src/environments/environment.ts"
}