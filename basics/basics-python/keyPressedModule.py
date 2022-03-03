import pygame

def init():
    pygame.init()
    window = pygame.display.set_mode((400,400))

def getKey(keyName: str) -> bool:
    answer = False
    for event in pygame.event.get():
        pass
    keyInput = pygame.key.get_pressed()
    myKey = getattr(pygame, f'K_{keyName}')
    if keyInput[myKey]:
        answer = True
    pygame.display.update()

    return answer


def main():
    if getKey('LEFT'):
        print('Left!')



if __name__ == '__main__':
    init()
    while True:
        main()
