variable "file_folder" {
  description = "Folder of the lambda file to include into the archive."
  type        = string
}

variable "function_name" {
  description = "The name of the lambda function."
  type        = string
}

variable "role" {
  description = "The role of the lambda function."
  type        = string
}

variable "environment_varibles" {
  description = "Environment variables for the lambda function."
  type        = map(any)
  default     = {}
}