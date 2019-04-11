pipeline {
    agent any
    options { timestamps () }

    stages {


    stage('Clean') {
        steps {
            echo 'Cleaning..'
            sh 'rm -rf node_modules'
			sh 'rm -rf app/node_modules'
            sh 'rm -rf logs'
            sh 'rm -rf CountryCodeService*.zip'
        }
    }
        stage('Build') {
            steps {
                echo 'Building..'
								sh 'npm install syber-server@0.1.8'
                sh 'npm install'
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
			        branch 'jenkins-multibranch'
			        }
			            steps {
			            withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', credentialsId: 'backmanity-conditioner-aws', variable: 'AWS_ACCESS_KEY_ID']]) {
			                   echo 'Deploying feature branch....'
			                   sh 'npm run app-zip'
												 sh 'mv CountryCodeService.zip "CountryCodeService_feature_$BUILD_NUMBER.zip"'
												 sh 'aws s3 cp "CountryCodeService_feature_$BUILD_NUMBER.zip" s3://ods-sa-t1-io/Bachmanity/Country-Code-Service/'
												 sh 'aws s3 ls s3://ods-sa-t1-io/Bachmanity/Country-Code-Service/'
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
										 }
									}
							}
						}
					}
