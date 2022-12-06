data "aws_api_gateway_rest_api" "this" {
  name = "shopping_list_api"
}

resource "local_file" "environment_config" {
  content = templatefile("${path.module}/${var.frontend_folder}/src/environments/environment.template.ts", {
    apiUrl     = "https://${data.aws_api_gateway_rest_api.this.id}.execute-api.${var.region}.amazonaws.com/prod",
    cognitoUrl = "https://cognito-idp.${var.region}.amazonaws.com/${tolist(data.aws_cognito_user_pools.this.ids)[0]}",
    clientId   = aws_cognito_user_pool_client.prod_client.id,
    clientUrl  = "https://${aws_cloudfront_distribution.this.domain_name}",
    }
  )
  filename = "${path.module}/${var.frontend_folder}/src/environments/environment.prod.ts"
}