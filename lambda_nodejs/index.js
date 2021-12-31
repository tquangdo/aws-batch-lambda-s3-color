'use strict';

const AWS = require('aws-sdk');
const S3 = new AWS.S3();

// AWS Batch Setting
const BATCH = new AWS.Batch({ apiVersion: '2016-08-10' });

console.log('Loading function');

exports.handler = (event, context, callback) => {

    // let bucket = event.Records[0].s3.bucket.name;
    // let key = event.Records[0].s3.object.key;
    // let filePath = bucket + '/' + key;
    // console.log(filePath);

    let params = {
        jobDefinition: 'dtq-defi-job1',
        jobName: 'dtq-lambda-job1',
        jobQueue: 'dtq-queue',
        arrayProperties: {
            size: 7
        }
    };

    // Submit the Batch Job
    BATCH.submitJob(params, function (err, data) {
        if (err) console.log(err, err.stack);
        else console.log(data);
        if (err) {
            console.error(err);
            const message = `Error calling SubmitJob for: ${event.jobName}`;
            console.error(message);
            callback(message);
        } else {
            const jobId = data.jobId;
            console.log('jobId:', jobId);
            callback(null, jobId);

            // submit job 2
            let params2 = {
                jobDefinition: 'dtq-defi-job2',
                jobName: 'dtq-lambda-job2',
                jobQueue: 'dtq-queue',
                dependsOn: [{
                    jobId: jobId,
                    type: 'SEQUENTIAL',
                }]
            };

            // Submit the Batch Job
            BATCH.submitJob(params2, function (err, data2) {
                if (err) console.log(err, err.stack);
                else console.log(data2);
                if (err) {
                    console.error(err);
                    const message = `Error calling SubmitJob for: ${event.jobName}`;
                    console.error(message);
                    callback(message);
                } else {
                    const jobId2 = data2.jobId;
                    console.log('jobId2:', jobId2);
                    callback(null, jobId2);

                }
            });
        }
    });
};