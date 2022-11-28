data "aws_iam_policy_document" "lambda_assume_role_policy" {
  statement {
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }
  }
}

data "aws_iam_policy_document" "shopping_list_table_access_policy" {
  statement {
    actions = [
      "dynamodb:BatchGetItem",
      "dynamodb:GetItem",
      "dynamodb:Query",
      "dynamodb:Scan",
      "dynamodb:BatchWriteItem",
      "dynamodb:PutItem",
      "dynamodb:UpdateItem",
    ]
    resources = [aws_dynamodb_table.shopping_list.arn]
  }
}

resource "aws_iam_role" "lambda" {
  name               = "lambda"
  assume_role_policy = data.aws_iam_policy_document.lambda_assume_role_policy.json
}

resource "aws_iam_role_policy" "lambda_access_to_shopping_list_table" {
  name   = "lambda_access_to_shopping_list_table_policy"
  role   = aws_iam_role.lambda.id
  policy = data.aws_iam_policy_document.shopping_list_table_access_policy.json
}