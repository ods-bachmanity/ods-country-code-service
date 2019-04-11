pipeline {
    agent any
    options { timestamps () }

    stages {


    stage('Clean') {
        steps {
            echo 'Cleaning..'
            sh 'rm -rf node_modules'
            sh 'rm -rf logs'
            sh 'rm -rf CountryCodeService*.zip'
        }
    }
        stage('Build') {
            steps {
                echo 'Building..'
								sh 'npm config set registry https://registry.npmjs.com/'
                sh 'npm install npm install && npm install grunt-protractor-runner --save-dev'
                sh 'npm run tsc-version'
                sh 'npm run tsc-build'
                sh 'ls -l app/'
            }
        }
        stage('Test') {
            steps {
                echo 'Testing..'
                sh 'npm run newman-version'
                sh 'npm run happy-path-tests'
                sh 'npm run bad-path-tests'
            }
        }
				stage('Deploy-Feature') {
			        when {
			        branch 'jenkins-ec2-com'
			        }
			            steps {
			            withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', credentialsId: 'backmanity-conditioner-aws', variable: 'AWS_ACCESS_KEY_ID']]) {
			                   echo 'Deploying feature branch....'
			                   sh 'npm run app-zip'
												 sh 'mv CountryCodeService.zip "CountryCodeService_feature_$BUILD_NUMBER.zip"'
												 sh 'aws s3 cp "CountryCodeService_feature_$BUILD_NUMBER.zip" s3://ods-sa-t1-io/Bachmanity/Country-Code-Service/'
												 sh 'aws s3 ls s3://ods-sa-t1-io/Bachmanity/Country-Code-Service/'
												 sh '''
												 output=$(aws ec2 describe-instances --filters "Name=tag:aws:cloudformation:stack-id,Values=arn:aws:cloudformation:us-east-1:045627890776:stack/Country-Code-Service-Version-3/e67d1650-2403-11e9-aad3-12d7c29d9238" --query "Reservations[].Instances[].InstanceId")
												 output=`echo "$output" | awk -F'"' '{print $2}'`
												 aws ec2 terminate-instances --instance-ids $output
												 '''
			               }
			            }
			        }
							stage('Deploy-Dev') {
							when {
							branch 'dev'
							}
									steps {
									withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', credentialsId: 'backmanity-conditioner-aws', variable: 'AWS_ACCESS_KEY_ID']]) {
												 echo 'Deploying dev branch....'
												 sh 'npm run app-zip'
												 sh 'mv CountryCodeService.zip "CountryCodeService_dev_$BUILD_NUMBER.zip"'
												 sh 'aws s3 cp "CountryCodeService_dev_$BUILD_NUMBER.zip" s3://ods-sa-t1-io/Bachmanity/Country-Code-Service/'
												 sh 'aws s3 ls s3://ods-sa-t1-io/Bachmanity/Country-Code-Service/'
												 sh '''
												 output=$(aws ec2 describe-instances --filters "Name=tag:aws:cloudformation:stack-id,Values=arn:aws:cloudformation:us-east-1:045627890776:stack/Country-Code-Service-Version-3/e67d1650-2403-11e9-aad3-12d7c29d9238" --query "Reservations[].Instances[].InstanceId")
												 output=`echo "$output" | awk -F'"' '{print $2}'`
												 aws ec2 terminate-instances --instance-ids $output
												 '''
										 }
									}
							}
							stage('Deploy-Master') {
							when {
							branch 'master'
							}
									steps {
									withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', credentialsId: 'backmanity-conditioner-aws', variable: 'AWS_ACCESS_KEY_ID']]) {
												 echo 'Deploying master branch....'
												 sh 'npm run app-zip'
												 sh 'mv CountryCodeService.zip "CountryCodeService_master_$BUILD_NUMBER.zip"'
												 sh 'aws s3 cp "CountryCodeService_master_$BUILD_NUMBER.zip" s3://ods-sa-t1-io/Bachmanity/Country-Code-Service/'
												 sh 'aws s3 ls s3://ods-sa-t1-io/Bachmanity/Country-Code-Service/'
												 sh '''
												 output=$(aws ec2 describe-instances --filters "Name=tag:aws:cloudformation:stack-id,Values=arn:aws:cloudformation:us-east-1:045627890776:stack/Country-Code-Service-Version-3/e67d1650-2403-11e9-aad3-12d7c29d9238" --query "Reservations[].Instances[].InstanceId")
												 output=`echo "$output" | awk -F'"' '{print $2}'`
												 aws ec2 terminate-instances --instance-ids $output
												 '''
										 }
									}
							}
						}
					}
