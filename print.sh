#!/bin/sh
aws s3 cp s3://dtq-bucket/color.txt .
LINE=$((AWS_BATCH_JOB_ARRAY_INDEX + 1))
COLOR=$(sed -n ${LINE}p color.txt)
echo My favorite color of the rainbow is $COLOR >> line$LINE
aws s3 cp line$LINE s3://dtq-bucket/