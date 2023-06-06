import socket_io from 'socket.io';
import { ApiServer } from './api_server';

const io = new socket_io.Server(ApiServer);

export const IO = io;
