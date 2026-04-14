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
                # Build with version tag
                docker build -t $DOCKERHUB/mongo-api:$IMAGE_TAG ./metriccmongo
                docker build -t $DOCKERHUB/mysql-api:$IMAGE_TAG ./metricmysql
                docker build -t $DOCKERHUB/frontend:$IMAGE_TAG ./metriclient

                # Tag same images as latest
                docker tag $DOCKERHUB/mongo-api:$IMAGE_TAG $DOCKERHUB/mongo-api:latest
                docker tag $DOCKERHUB/mysql-api:$IMAGE_TAG $DOCKERHUB/mysql-api:latest
                docker tag $DOCKERHUB/frontend:$IMAGE_TAG $DOCKERHUB/frontend:latest
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

                    # Push versioned images
                    docker push $DOCKERHUB/mongo-api:$IMAGE_TAG
                    docker push $DOCKERHUB/mysql-api:$IMAGE_TAG
                    docker push $DOCKERHUB/frontend:$IMAGE_TAG

                    # Push latest tag
                    docker push $DOCKERHUB/mongo-api:latest
                    docker push $DOCKERHUB/mysql-api:latest
                    docker push $DOCKERHUB/frontend:latest

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
                docker-compose pull   # pulls latest
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
