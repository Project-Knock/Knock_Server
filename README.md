# 기숙사 관리 서비스 Knock
기숙사 관리 서비스 Knock의 서버 레포지토리입니다.
## 사용 환경
- Raspberry Pi 4 Model B
- Ubuntu 24.04 LTS
## 의존성
### Frontend
- package.json 참고
### Python
- flask
- flask_sqlalchemy
- flask_login
- pymysql
- base_api_response
- flask_session
- dotenv
- paho-mqtt
### 기타
- mosquitto
## 주요 기능
### 하드웨어를 통한 기숙사 제어
- 오픈소스 MQTT 클라이언트인 Mosquitto를 활용하여 하드웨어와의 통신이 간편합니다.
### 학교 안 어디서든 사용 가능
- 라즈베리파이와 PM2를 활용하여 무중단 서비스를 제공합니다. 학교 인터넷에 연결되면 간편하게 접속할 수 있습니다.
