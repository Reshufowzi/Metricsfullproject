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

                    docker logout
                    '''
                }
            }
        }

        stage('Deploy Application') {
            steps {
                sh '''
                export MONGODB_URI="mongodb+srv://vgrsoftlogic:vgr1234567@cluster0.ezxwamt.mongodb.net/Metrics?retryWrites=true&w=majority"

                docker-compose down || true
                docker-compose pull
                docker-compose up -d
                '''
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
