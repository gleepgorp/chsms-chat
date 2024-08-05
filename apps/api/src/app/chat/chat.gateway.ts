import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, ConnectedSocket } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('joinUserRoom')
  handleJoinUserRoom(@MessageBody() userId: string, @ConnectedSocket() client: Socket) {
    client.join(`user_${userId}`);
  }

  @SubscribeMessage('leaveUserRoom')
  handleLeaveUserRoom(@MessageBody() userId: string, @ConnectedSocket() client: Socket) {
    client.leave(`user_${userId}`);
  }

  @SubscribeMessage('joinRoom') 
  handleJoinRoom(@MessageBody() room: string, @ConnectedSocket() client: Socket) {
    client.join(room);
  }

  @SubscribeMessage('leaveRoom') 
  handleLeaveRoom(@MessageBody() room: string, @ConnectedSocket() client: Socket) {
    client.leave(room);
  }

  @SubscribeMessage('sendMessage')
  handleMessage(@MessageBody() data: string): void {
    this.server.emit('newMessage', data);
  }
}