import json
from turfpy import measurement
from turfpy.measurement import destination
from geojson import Point, Feature
import decimal_coodinates
import exif
import math

from geographiclib.constants import Constants 
from geographiclib.geodesic import Geodesic

image_name = './Views/39081697872_536d8bd641_o.jpg'
# Photo origin: https://www.flickr.com/photos/132646954@N02/39081697872/

# Sensors Length/Width
SENw = 6.16
SENl = 4.62

screen_width = 3992
screen_length = 2992

#Calculates the direction of the drone.
def calculate_bearing(a,b):
    angle = math.degrees(math.atan2(a,b))
    print("bearing", angle)
    return angle

#Calculates the destination coordinates.
def getEndpoint(lat1, lon1, bearing, d):
    geod = Geodesic(Constants.WGS84_a, Constants.WGS84_f)
    d = geod.Direct(lat1, lon1, bearing, d)
    return d['lat2'], d['lon2']

# This function returns alpht or beta, which it is the lens degree
def get_alpha_beta(sensor):
    focal_lenght = exif.get_focal_length(image_name) 
    alpha = 2*(math.atan(sensor/(2*focal_lenght)))
    degrees = math.degrees(alpha)

    return degrees

#returns current location
def get_current_location():
    return Feature(geometry=Point(decimal_coodinates.get_coordinatess(image_name)))


# This function calculates the camera width angle (alpha) in meters
def get_real_world_width():
    # Start by getting alpth using get_alpha_beta function.
    alpha = get_alpha_beta(SENw)
    height = exif.get_height(image_name)   

    # changing tan to radians for calculation.
    tan = (math.tan(math.radians(alpha)/2))
    Wr = (2*height)*tan
    return Wr

# This function calculates the camera length angle (beta) in meters
def get_real_world_length():
    # Start by getting beta using get_alpha_beta function.
    beta = get_alpha_beta(SENl)
    height = exif.get_height(image_name)   
    
    # changing tan to radians for calculation.
    tan = (math.tan(math.radians(beta)/2))
    Lr = (2*height)*tan

    return Lr
    
# This functions calculates pixels to meter.
def realSize_to_screenSize(Wr, Lr, Ws, Ls):
    converted_width = (Wr/Ws)
    converted_length = (Lr/Ls)

    return converted_width, converted_length

#Calculates the real distance the drone need to move.
def drone_movement(dest_x, dest_y, current_location):
    Wr = get_real_world_width()
    Lr = get_real_world_length()
    converted = realSize_to_screenSize(Wr, Lr, screen_width, screen_length)

    # calculates the center of the screen.  
    center_x = screen_width/2
    center_y = screen_length/2

    #Converting pixels distance to meters. Positive X means North (Old picture)
    move_x = (dest_x - center_x)*converted[0]
    move_y = (dest_y - center_y)*converted[1]

    angle = calculate_bearing(move_y, move_x)
    angle = (angle + 270) % 360

    print("angle is:", angle)
    total_move = (move_x**2 + move_y**2)**0.5
    new_location = getEndpoint(current_location[0], current_location[1], angle, total_move)

    return new_location
