variable "region" {
  description = "The specified region."
  type        = string
}

variable "frontend_build_folder" {
  description = "The folder containing the builded frontend source code."
  type        = string
}

variable "bucket_name" {
  description = "The name of the s3 bucket."
  type        = string
}