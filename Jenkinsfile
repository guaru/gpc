pipeline {
    agent any

    stages {
      stage("gpc") {
        steps {
          sh 'docker-compose -f docker-compose.yml up -d --build'
        }
      }
    }
}