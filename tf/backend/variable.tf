variable "region" {
  description = "The specified region."
  type        = string
}

variable "shopping_list_user_pool" {
  description = "The shopping list app user pool name."
  type        = string
}

variable "frontend_folder" {
  description = "The folder containing the frontend source code."
  type        = string
}

variable "lambda_folder" {
  description = "The folder containing the lambda functions source code."
  type        = string
}