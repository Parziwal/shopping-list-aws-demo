output "cognito_url" {
  description = "The cognito user pool url."
  value = "https://cognito-idp.${var.region}.amazonaws.com/${aws_cognito_user_pool.this.id}"
}

output "domain_url" {
  description = "The cognito user pool domain."
  value = "https://${aws_cognito_user_pool_domain.this.domain}.auth.us-east-1.amazoncognito.com"
}