from pprint import pprint
from PIL import Image
import decimal_coodinates
import piexif

codec = 'ISO-8859-1'  # or latin-1


def exif_to_tag(exif_dict):
    exif_tag_dict = {}
    thumbnail = exif_dict.pop('thumbnail')
    exif_tag_dict['thumbnail'] = thumbnail.decode(codec)

    for ifd in exif_dict:
        exif_tag_dict[ifd] = {}
        for tag in exif_dict[ifd]:
            try:
                element = exif_dict[ifd][tag].decode(codec)

            except AttributeError:
                element = exif_dict[ifd][tag]

            exif_tag_dict[ifd][piexif.TAGS[ifd][tag]["name"]] = element

    return exif_tag_dict

#Returns drone height.
def get_height(filename):
    # obviously one of your own pictures
    im = Image.open(filename)

    exif_dict = piexif.load(im.info.get('exif'))
    exif_dict = exif_to_tag(exif_dict)
    height = exif_dict['GPS']['GPSAltitude'][0] / exif_dict['GPS']['GPSAltitude'][1]
    return height

#Returns camera focal length
def get_focal_length(filename):
   im = Image.open(filename)

   exif_dict = piexif.load(im.info.get('exif'))
   exif_dict = exif_to_tag(exif_dict)
#    focal = exif_dict['Exif']['FocalLength'][0]/100000
   focal = exif_dict['Exif']['FocalLength'][0]/exif_dict['Exif']['FocalLength'][1]

   
   return focal
   