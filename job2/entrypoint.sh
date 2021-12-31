#!/bin/bash
aws s3 cp s3://dtq-bucket/ . --rescusive
for i in `ls |grep line`
do
cat $i >> mycolor
done
aws s3 cp mycolor s3://dtq-bucket/mycolor