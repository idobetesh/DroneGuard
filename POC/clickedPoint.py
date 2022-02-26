# importing the module
import cv2
import exif
import decimal_coodinates, navigation

# function to display the coordinates of
# of the points clicked on the image

image_name = './Views/39081697872_536d8bd641_o.jpg'

def click_event(event, x, y, flags, params):

    # checking for left mouse clicks
    if event == cv2.EVENT_LBUTTONDOWN:
        # displaying the coordinates
        print(f'click point: ({x}, {y})')
        # print('coordinates: ', decimal_coodinates.get_coordinatess(image_name))
        # print('height: ', exif.get_height(image_name))
        current_location = navigation.get_current_location()
        print("Current Location:", current_location)
        print(navigation.drone_movement(int(x),int(y), current_location['geometry']['coordinates']))




# driver function
if __name__ == "__main__":

    # reading the image
    img = cv2.imread(image_name, 1)

    # displaying the image
    cv2.imshow('image', img)

    # setting mouse handler for the image
    # and calling the click_event() function
    cv2.setMouseCallback('image', click_event)

    # wait for a key to be pressed to exit
    cv2.waitKey(0)

    # close the window
    cv2.destroyAllWindows()
