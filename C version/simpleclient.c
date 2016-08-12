#include <stdio.h>
#include <sys/types.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <arpa/inet.h>
#include <unistd.h>

int int main(int argc, char const *argv[]) {
  int sockfd;
  int len;
  struct sockaddr_in address;
  int result;
  char ch = 'A';

  sockfd = socket(AF_INET, SOCK_STREAM, 0);
  address.sin_family = AF_INET;
  address.sin_addr.s_addr = inet_addr("127.0.0.1");
  len = sizeof(address);
  result = connect(sockfd, (struct sockaddr *)&address, len)

  if (result == -1) {
    perror("opps:client1");
    exit(1);
  }
  write(sockfd, &ch, 1);
  read(sockfd, &ch, 1);
  printf("char from server = %c\n", ch);
  close(sockfd);
  return 0;
}
