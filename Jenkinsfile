pipeline {
    agent any

    environment {
        DOCKERHUB = "reshma0209"
        IMAGE_TAG = "${BUILD_NUMBER}"
    }

    stages {

        stage('Build Docker Images') {
            steps {
                sh '''
                docker build -t $DOCKERHUB/mongo-api:$IMAGE_TAG ./metriccmongo
                docker build -t $DOCKERHUB/mysql-api:$IMAGE_TAG ./metricmysql
                docker build -t $DOCKERHUB/frontend:$IMAGE_TAG ./metriclient
                '''
            }
        }

        stage('Push to DockerHub') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'docker-creds',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh '''
                    echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin

                    docker push $DOCKERHUB/mongo-api:$IMAGE_TAG
                    docker push $DOCKERHUB/mysql-api:$IMAGE_TAG
                    docker push $DOCKERHUB/frontend:$IMAGE_TAG
                    '''
                }
            }
        }

        stage('Deploy Application') {
            steps {
                withCredentials([string(credentialsId: 'mongo-uri', variable: 'MONGO_URI')]) {
                    sh '''
                    export MONGODB_URI=$MONGO_URI

                    docker-compose down || true
                    docker-compose up -d --build
                    '''
                }
            }
        }
    }

    post {
        success {
            echo "Deployment Successful 🚀"
        }
        failure {
            echo "Deployment Failed ❌"
        }
    }
}
