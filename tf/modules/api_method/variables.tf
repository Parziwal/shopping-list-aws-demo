variable "api_id" {
  description = "Rest API gateway ID."
  type        = string
}

variable "resource_id" {
  description = "Rest API gateway resource ID."
  type        = string
}

variable "resource_path" {
  description = "Rest API gateway resource path."
  type        = string
}

variable "http_method_type" {
  description = "The method HTTP method type."
  type        = string
}

variable "authorizer_id" {
  description = "The id of the authorizer to be used during authorization."
  type        = string
}

variable "lambda_function_name" {
  description = "THe name of the lambda function to be invoked."
  type        = string
}

variable "lambda_invoke_arn" {
  description = "THe arn of the lambda function to be invoked."
  type        = string
}

variable "execution_arn" {
  description = "The execution arn of the rest api gateway."
  type        = string
}

variable "integration_request_template" {
  description = "Map of the integration request template in json."
  type        = string
}