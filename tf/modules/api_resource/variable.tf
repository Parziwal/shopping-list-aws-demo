variable "api_id" {
  description = "Rest API gateway ID."
  type        = string
}

variable "parent_id" {
  description = "ID of the parent API resource."
  type        = string
}

variable "path_part" {
  description = "Last path segment of this API resource."
  type        = string
}
