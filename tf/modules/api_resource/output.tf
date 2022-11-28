output "resource_id" {
  description = "API Gateway resource id."
  value       = aws_api_gateway_resource.this.id
}

output "path" {
  description = "Full path of the resource."
  value       = aws_api_gateway_resource.this.path
}