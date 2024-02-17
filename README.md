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

### Data Modeling - 
![data_model drawio](https://github.com/Akshat120/Real-Time-Chat-App/assets/53970116/5219ca8a-ee2a-4cb4-ac56-5cf9f1ff479f)

## QnA
Q. Why this problem can't be able to solved without special library effectively like socket.io ? <br>
A. yes, it can be solved using classical core properties but that will be very complex to implement it from ground. <br>
Q. What's the main challenges to this problem ? <br>
A. We need to notify `receiver` and display the message. This event is not predictable that when to refresh the `receiver` chat page. <br>
