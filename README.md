# CLS-Express-Media-Server
Software | WebServer implementing RESTful API with NodeJS, Sequelize Database, and additional server services supports

Project Structure
-----------------
```
├── backend.js
├── repos
│   ├── album_repository.js
│   ├── connection_repository.js
│   ├── post_repository.js
│   ├── saleBlock_repository.js
│   └── user_repository.js
├── routes
│   ├── albums.js
│   ├── auth.js
│   ├── connections.js
│   ├── posts.js
│   ├── register.js
│   ├── saleBlocks.js
│   ├── shopCaster.js
│   └── users.js
├── services
│   ├── app_backend_service.js
│   ├── authentication
│   │   ├── certificates
│   │   │   └── apn
│   │   │       └── cert.pem
│   │   ├── local
│   │   │   └── token_service.js
│   │   └── remote
│   │       ├── auth.js
│   │       └── remote_auth.js
│   ├── notifications
│   │   └── pushNotifier.js
│   ├── transactions
│   │   └── stripe
│   │       ├── config.js
│   │       └── stripe_service.js
│   └── webSocketDelegates
│       ├── applicationClient.js
│       └── liveSessions.js
└── use_cases
    ├── albumUseCases
    │   └── albumUseCase.js
    ├── connectionUseCases
    │   ├── connections.js
    │   └── createConnectionBlock.js
    ├── fileDataUseCases
    │   ├── arrayUpload.js
    │   └── singularUpload.js
    ├── initialUseCases
    │   ├── emailVerification.js
    │   ├── login.js
    │   ├── register_user.js
    │   └── remote_auth.js
    ├── itemUseCases
    │   └── albumUseCase.js
    ├── postsUseCases
    │   ├── postResponse.js
    │   └── posts.js
    ├── saleBlockUseCases
    │   └── saleBlockUseCase.js
    ├── userTableUpdates.js
    └── userUseCases
        ├── get_user_feed.js
        ├── getUserTableIds.js
        ├── updateUser.js
        └── userResponse.js
```
