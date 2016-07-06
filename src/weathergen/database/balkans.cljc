(ns weathergen.database.balkans)

(def theater-info
  {:owners
   {0 "Greece"
    1 "Slovenia"
    2 "NATO"
    3 "Bosnia"
    4 "Albania"
    5 "Hungary"
    6 "FRY"
    7 "Croatia"}

   :size [1024 1024]

   :mapping {:left      [11 0]
             :top       [45 49.25]
             :bottom    [36 37.3]
             :top-right [24 11.67]}

   :objectives
   ;; Some of these were edited by hand, unfortunately. Some of the
   ;; custom airbases have atype that's not "Airbase", and rather than
   ;; get into all that I just copied them in.
   [{:x 162 :y 962  :owner "NATO" :name "Aviano Airbase", :type "Airbase"}
    ;; Hand edits above this line
    {:x 51, :y 948, :owner "NATO", :name "Asiago Airport", :type "Airbase"}
    {:x 299, :y 845, :owner "Croatia", :name "Pula Airport", :type "Airbase"}
    {:x 266, :y 903, :owner "Croatia", :name "Portoroz Airport", :type "Airbase"}
    {:x 520, :y 933, :owner "FRY", :name "Zagreb Airport", :type "Airbase"}
    {:x 792, :y 589, :owner "FRY", :name "Tivat Airport", :type "Airbase"}
    {:x 1015, :y 834, :owner "FRY", :name "Kovin Airbase", :type "Airbase"}
    {:x 656, :y 397, :owner "NATO", :name "Grottaglie Airbase", :type "Airbase"}
    {:x 570, :y 390, :owner "NATO", :name "Matera Airport", :type "Airbase"}
    {:x 154, :y 664, :owner "NATO", :name "Perugia Airport", :type "Airbase"}
    {:x 57, :y 918, :owner "NATO", :name "Vicenza Airport", :type "Airbase"}
    {:x 124, :y 793, :owner "NATO", :name "Ravenna Airport", :type "Airbase"}
    {:x 790, :y 803, :owner "FRY", :name "Tuzla Airport", :type "Airbase"}
    {:x 754, :y 737, :owner "FRY", :name "Sarajevo International", :type "Airbase"}
    {:x 712, :y 412, :owner "NATO", :name "Brindisi-Casale Airport", :type "Airbase"}
    {:x 11, :y 962, :owner "NATO", :name "Mattarello Airport", :type "Airbase"}
    {:x 419, :y 1009, :owner "Slovenia", :name "Slovenj Gradec Airport", :type "Airbase"}
    {:x 551, :y 988, :owner "Croatia", :name "Varazdin Airport", :type "Airbase"}
    {:x 598, :y 946, :owner "FRY", :name "Bjelovar Airstrip", :type "Airstrip"}
    {:x 885, :y 837, :owner "FRY", :name "Sabac  Airstrip", :type "Airstrip"}
    {:x 862, :y 407, :owner "Albania", :name "Mifol Airport", :type "Airbase"}
    {:x 1001, :y 233, :owner "Greece", :name "Preveza Airport", :type "Airbase"}
    {:x 1010, :y 115, :owner "Greece", :name "Dionisios Solomos Airport", :type "Airbase"}
    {:x 706, :y 1001, :owner "Hungary", :name "Taszar Airbase", :type "Airbase"}
    {:x 794, :y 989, :owner "Hungary", :name "Ocseny Airport", :type "Airbase"}
    {:x 950, :y 427, :owner "Albania", :name "Berat Airstrip", :type "Airstrip"}
    {:x 7, :y 629, :owner "NATO", :name "Grosseto Airport", :type "Airbase"}
    {:x 26, :y 676, :owner "NATO", :name "Ampugnano Airport", :type "Airbase"}
    {:x 486, :y 813, :owner "FRY", :name "Udbina Airport", :type "Airbase"}
    {:x 447, :y 765, :owner "FRY", :name "Zemunik Airport", :type "Airbase"}
    {:x 701, :y 679, :owner "FRY", :name "Mostar Airport", :type "Airbase"}
    {:x 542, :y 708, :owner "FRY", :name "Split Airport", :type "Airbase"}
    {:x 890, :y 741, :owner "FRY", :name "Lepa Glava Airport", :type "Airbase"}
    {:x 955, :y 840, :owner "FRY", :name "Beograd Airport", :type "Airbase"}
    {:x 947, :y 850, :owner "FRY", :name "Batajnica Airport", :type "Airbase"}
    {:x 982, :y 736, :owner "FRY", :name "Kraljevo Airbase", :type "Airbase"}
    {:x 926, :y 678, :owner "FRY", :name "Sjenica Airport", :type "Airbase"}
    {:x 907, :y 629, :owner "FRY", :name "Ivangrad Airbase", :type "Airbase"}
    {:x 846, :y 585, :owner "FRY", :name "Podgorica Airbase", :type "Airbase"}
    {:x 749, :y 606, :owner "FRY", :name "Dubrovnic International", :type "Airbase"}
    {:x 135, :y 778, :owner "NATO", :name "Cervia Airbase", :type "Airbase"}
    {:x 488, :y 842, :owner "FRY", :name "Bihac Airport", :type "Airbase"}
    {:x 28, :y 810, :owner "NATO", :name "Bologna Airbase", :type "Airbase"}
    {:x 227, :y 517, :owner "NATO", :name "Frosinone Airfield", :type "Airbase"}
    {:x 208, :y 957, :owner "NATO", :name "Rivolto Airport", :type "Airbase"}
    {:x 335, :y 440, :owner "NATO", :name "Capodichino Airport", :type "Airbase"}
    {:x 81, :y 900, :owner "NATO", :name "Padova Airport", :type "Airbase"}
    {:x 253, :y 942, :owner "NATO", :name "Ronchi dei legionari AP", :type "Airbase"}
    {:x 314, :y 455, :owner "NATO", :name "Grazzanise Airport", :type "Airbase"}
    {:x 702, :y 390, :owner "NATO", :name "San Pancrazio Airport", :type "Airbase"}
    {:x 324, :y 593, :owner "NATO", :name "Pescara Airport", :type "Airbase"}
    {:x 731, :y 370, :owner "NATO", :name "Lecce Airbase", :type "Airbase"}
    {:x 120, :y 923, :owner "NATO", :name "S.Angelo Airport", :type "Airbase"}
    {:x 360, :y 891, :owner "Croatia", :name "Rijeka Airport", :type "Airbase"}
    {:x 462, :y 950, :owner "Slovenia", :name "Cerklje Ob Krki Airport", :type "Airbase"}
    {:x 643, :y 851, :owner "FRY", :name "Banja Luka Airport", :type "Airbase"}
    {:x 164, :y 755, :owner "NATO", :name "Rimini Airport", :type "Airbase"}
    {:x 607, :y 424, :owner "NATO", :name "Gioia del colle Airbase", :type "Airbase"}
    {:x 484, :y 501, :owner "NATO", :name "Amendola Airport", :type "Airbase"}
    {:x 464, :y 492, :owner "NATO", :name "Gino Lisa Airport", :type "Airbase"}
    {:x 109, :y 929, :owner "NATO", :name "Istrana Airport", :type "Airbase"}
    {:x 779, :y 853, :owner "FRY", :name "Brcko Airstrip", :type "Airstrip"}
    {:x 108, :y 775, :owner "NATO", :name "Forli Airbase", :type "Airbase"}
    {:x 139, :y 910, :owner "NATO", :name "Tessera Airport", :type "Airbase"}
    {:x 480, :y 1008, :owner "Slovenia", :name "Maribor Airport", :type "Airbase"}
    {:x 30, :y 1004, :owner "NATO", :name "Bolzano Airport", :type "Airbase"}
    {:x 354, :y 982, :owner "Slovenia", :name "Ljubljana Airport", :type "Airbase"}
    {:x 366, :y 934, :owner "Slovenia", :name "Bloska Polica Airstrip", :type "Airstrip"}
    {:x 445, :y 945, :owner "Slovenia", :name "Cerklje Airstrip", :type "Airstrip"}
    {:x 471, :y 898, :owner "Croatia", :name "Karlovac Airstrip", :type "Airstrip"}
    {:x 708, :y 874, :owner "FRY", :name "Slavonski Brod Airstrip", :type "Airstrip"}
    {:x 826, :y 709, :owner "FRY", :name "Gorazde Airstrip", :type "Airstrip"}
    {:x 836, :y 602, :owner "FRY", :name "Danilovgrad Airstrip", :type "Airstrip"}
    {:x 757, :y 628, :owner "FRY", :name "Trebenije Airstrip", :type "Airstrip"}
    {:x 965, :y 553, :owner "Albania", :name "Kukes Airbase", :type "Airbase"}
    {:x 998, :y 410, :owner "Albania", :name "Korce Northwest Airbase", :type "Airbase"}
    {:x 937, :y 351, :owner "Albania", :name "Gjirokaster Airport", :type "Airbase"}
    {:x 973, :y 154, :owner "Greece", :name "Kefallinia Airport", :type "Airbase"}
    {:x 612, :y 1002, :owner "Hungary", :name "Nagykanizsa Airport", :type "Airbase"}
    {:x 739, :y 962, :owner "Hungary", :name "Pecs East Airport", :type "Airbase"}
    {:x 778, :y 952, :owner "Hungary", :name "Satorhely Airbase", :type "Airbase"}
    {:x 932, :y 982, :owner "Hungary", :name "Szeged Airport", :type "Airbase"}
    {:x 898, :y 481, :owner "Albania", :name "Tirane International", :type "Airbase"}
    {:x 888, :y 448, :owner "Albania", :name "Lushnje Airstrip", :type "Airstrip"}
    {:x 826, :y 932, :owner "FRY", :name "Sombor Airport", :type "Airbase"}
    {:x 798, :y 904, :owner "FRY", :name "Osijek Airport", :type "Airbase"}
    {:x 997, :y 465, :owner "FRY", :name "Ohrid Airport", :type "Airbase"}
    {:x 589, :y 460, :owner "NATO", :name "Bari Airport", :type "Airbase"}
    {:x 243, :y 712, :owner "NATO", :name "Falconara Airport", :type "Airbase"}
    {:x 19, :y 736, :owner "NATO", :name "Peretola Airport", :type "Airbase"}
    {:x 193, :y 502, :owner "NATO", :name "Latina Airport", :type "Airbase"}
    {:x 907, :y 425, :owner "Albania", :name "Berat Airbase", :type "Airbase"}
    {:x 882, :y 539, :owner "Albania", :name "Gramsh Airport", :type "Airbase"}
    {:x 876, :y 555, :owner "Albania", :name "Shkoder Airbase", :type "Airbase"}
    {:x 1004, :y 310, :owner "Greece", :name "Ioannina Airport", :type "Airbase"}
    {:x 893, :y 491, :owner "Albania", :name "Tirane Rinas Airport", :type "Airbase"}
    {:x 924, :y 450, :owner "Albania", :name "Elbasan Airbase", :type "Airbase"}
    {:x 127, :y 528, :owner "NATO", :name "Fiumicino Airport", :type "Airbase"}
    {:x 154, :y 131, :owner "NATO", :name "Birgi Airport", :type "Airbase"}
    {:x 411, :y 90, :owner "NATO", :name "Catania Airbase", :type "Airbase"}
    {:x 476, :y 143, :owner "NATO", :name "Reggio Calabria Airport", :type "Airbase"}
    {:x 151, :y 514, :owner "NATO", :name "Pratica di Mare Airport", :type "Airbase"}
    {:x 163, :y 530, :owner "NATO", :name "Ciampino Airport", :type "Airbase"}
    {:x 398, :y 77, :owner "NATO", :name "Sigonella Airport", :type "Airbase"}
    {:x 215, :y 158, :owner "NATO", :name "Palermo Airport", :type "Airbase"}
    {:x 539, :y 234, :owner "NATO", :name "Lamezia Terme Airport", :type "Airbase"}
    {:x 622, :y 241, :owner "NATO", :name "Crotone Airport", :type "Airbase"}
    {:x 430, :y 777, :owner "FRY", :name "Zadar", :type "Airstrip"}
    {:x 178, :y 550, :owner "NATO", :name "Guidogna", :type "Airbase"}
    {:x 98, :y 19, :owner "NATO", :name "Pantelleria Airport", :type "Airbase"}
    {:x 157, :y 545, :owner "NATO", :name "Roma", :type "Airbase"}]})

