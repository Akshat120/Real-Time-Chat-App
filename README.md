# Real-Time-Chat-App

## Tech Involved
- Backend NodeJS
  - Express - Handle Rest-APIs calls
  - Socket.io - Provide Real-Time Chat service
  - JWT - Maintain secure user-connection
- Frontend ejs
  - Embedded JS - Provide dynamic rendering
- Database 
  - MongoDB - Store data
## System Design

### Data Modeling
![data_model drawio (1)](https://github.com/Akshat120/Real-Time-Chat-App/assets/53970116/d62e3508-b7f1-4a7f-bf36-065bd7df3601)

### Rest API Architecture
![route drawio](https://github.com/Akshat120/Real-Time-Chat-App/assets/53970116/ee8db331-4d40-4aaa-8a68-e0704b1bb9f0)

### Socket.io Workfow
![socket_io drawio (1)](https://github.com/Akshat120/Real-Time-Chat-App/assets/53970116/98ee596e-c9ae-469b-a781-fe7c19845c6f)


## QnA
Q. Why this problem can't be able to solved without special library effectively like socket.io ? <br>
A. yes, it can be solved using classical core properties but that will be very complex to implement it from ground. <br>
Q. What's the main challenges to this problem ? <br>
A. We need to notify `receiver` and display the message. This event is not predictable that when to refresh the `receiver` chat page. <br>
