#!/usr/bin/env groovy

node {

    parameters {
        choice(
            choices: ['on' , 'off'],
            description: '',
            name: 'JAVA_VERSION')
        choice(
            choices: ['on' , 'off'],
            description: '',
            name: 'BACKEND_TEST')
        choice(
            choices: ['on' , 'off'],
            description: '',
            name: 'FRONTEND_TEST')
    }

    stage('checkout') {
        checkout scm
    }

    stage('check java') {
        if(params.JAVA_VERSION == 'on') {
            sh "java -version"
        } else {
            echo "[stage] check java is skipped"
        }
    }

    stage('clean') {
        sh "cd online-store && chmod +x gradlew"
        sh "cd online-store && ./gradlew clean --no-daemon"
    }
    stage('nohttp') {
        sh "cd online-store && ./gradlew checkstyleNohttp --no-daemon"
    }

    stage('npm install') {
        sh "cd online-store && ./gradlew npm_install -PnodeInstall --no-daemon"
    }

    stage('backend tests') {
        if (params.BACKEND_TEST == 'on') {
            try {
                sh "cd online-store && ./gradlew test integrationTest -PnodeInstall --no-daemon"
            } catch (err) {
                throw err
            } finally {
                junit '**/build/**/TEST-*.xml'
            }
        } else {
            echo "[stage] backend tests is skipped"
        }
    }

    stage('frontend tests') {
        if (params.FRONTEND_TEST == 'on') {
            try {
                sh "cd online-store && ./gradlew npm_run_test -PnodeInstall --no-daemon"
            } catch (err) {
                throw err
            } finally {
                junit '**/build/test-results/TESTS-*.xml'
            }
        } else {
            echo "[stage] frontend tests is skipped"
        }
    }

    stage('packaging') {
        sh "cd online-store && ./gradlew bootJar -x test -Pprod -PnodeInstall --no-daemon"
        archiveArtifacts artifacts: '**/build/libs/*.jar', fingerprint: true
    }

    stage('deployment') {
        sh "cd online-store && ./gradlew deployHeroku --no-daemon"
    }

}
