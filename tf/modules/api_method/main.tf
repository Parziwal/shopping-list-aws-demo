resource "aws_lambda_permission" "this" {
  action        = "lambda:InvokeFunction"
  function_name = var.lambda_function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${var.execution_arn}/*/${var.http_method_type}${var.resource_path}"
}

resource "aws_api_gateway_method" "this" {
  rest_api_id   = var.api_id
  resource_id   = var.resource_id
  http_method   = var.http_method_type
  authorization = "COGNITO_USER_POOLS"
  authorizer_id = var.authorizer_id
  request_parameters = { "method.request.header.Authorization" = true }
}

resource "aws_api_gateway_integration" "this" {
  rest_api_id             = var.api_id
  resource_id             = var.resource_id
  http_method             = aws_api_gateway_method.this.http_method
  integration_http_method = "POST"
  type                    = "AWS"
  uri                     = var.lambda_invoke_arn

  passthrough_behavior = "WHEN_NO_TEMPLATES"
  request_templates = {
    "application/json" = var.integration_request_template
  }
}

resource "aws_api_gateway_method_response" "method_response_200" {
  rest_api_id         = var.api_id
  resource_id         = var.resource_id
  http_method         = aws_api_gateway_method.this.http_method
  status_code         = "200"
  response_parameters = { "method.response.header.Access-Control-Allow-Origin" = true }
  response_models = {
    "application/json" = "Empty"
  }
}

resource "aws_api_gateway_integration_response" "integration_response_200" {
  rest_api_id         = var.api_id
  resource_id         = var.resource_id
  http_method         = var.http_method_type
  status_code         = aws_api_gateway_method_response.method_response_200.status_code
  response_parameters = { "method.response.header.Access-Control-Allow-Origin" = "'*'" }
  depends_on = [
    aws_api_gateway_integration.this
  ]
}

resource "aws_api_gateway_method_response" "method_response_400" {
  rest_api_id         = var.api_id
  resource_id         = var.resource_id
  http_method         = aws_api_gateway_method.this.http_method
  status_code         = "400"
  response_parameters = { "method.response.header.Access-Control-Allow-Origin" = true }
  response_models = {
    "application/json" = "Error"
  }
}

resource "aws_api_gateway_integration_response" "integration_response_400" {
  rest_api_id         = var.api_id
  resource_id         = var.resource_id
  http_method         = aws_api_gateway_method.this.http_method
  status_code         = aws_api_gateway_method_response.method_response_400.status_code
  response_parameters = { "method.response.header.Access-Control-Allow-Origin" = "'*'" }
  response_templates = {
    "application/json" = "$input.path('$.errorMessage')"
  }
  selection_pattern = ".*Bad request.*"
  depends_on = [
    aws_api_gateway_integration.this
  ]
}