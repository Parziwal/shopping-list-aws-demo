output "cloud_front_url" {
  description = "The cloud front distribution url."
  value       = "https://${aws_cloudfront_distribution.this.domain_name}"
}