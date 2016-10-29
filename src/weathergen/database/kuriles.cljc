(ns weathergen.database.kuriles)

(def theater-info
  {:owners
   {0 "XX"
    1 "US"
    2 "Japan"
    3 "ROK"
    4 "DPRK"
    5 "PRC"
    6 "CIS"
    7 "Gorn"}

   :size [1024 1024]

   :mapping {:left      [51 11.750]
             :top       [137 0]
             :bottom    [41 59.950]
             :top-right [151 40.475]}

   :objectives
   ;; Some of these were edited by hand, unfortunately. Some of the
   ;; custom airbases have atype that's not "Airbase", and rather than
   ;; get into all that I just copied them in.
   [
    ;; Hand edits above this line
    {:x 424, :y 920, :owner 6, :name "Zonalnoye Airport", :type "Airbase", :id 4}
    {:x 174, :y 990, :owner 6, :name "Tsimmermanovka Airport", :type "Airbase", :id 5}
    {:x 422, :y 864, :owner 6, :name "Onor Airport", :type "Airbase", :id 6}
    {:x 454, :y 841, :owner 6, :name "Pervomaysk Zhitnitsa Airport", :type "Airbase", :id 7}
    {:x 465, :y 772, :owner 6, :name "Poronaysk Northeast Airport", :type "Airbase", :id 9}
    {:x 1012, :y 422, :owner 6, :name "Urup Airport", :type "Airbase", :id 10}
    {:x 430, :y 778, :owner 6, :name "Matrosovo Airbase", :type "Airbase", :id 11}
    {:x 24, :y 913, :owner 6, :name "Dzyomgi", :type "Airbase", :id 14}
    {:x 9, :y 890, :owner 6, :name "Komsomolsk-on-Amur", :type "Airbase", :id 15}
    {:x 240, :y 759, :owner 6, :name "Kamenny Ruchey Naval AB", :type "Airbase", :id 16}
    {:x 232, :y 737, :owner 6, :name "Vanino Airport", :type "Airbase", :id 17}
    {:x 244, :y 730, :owner 6, :name "Sovetskaya Gavan Airport", :type "Airbase", :id 18}
    {:x 222, :y 724, :owner 6, :name "Maygatka Airport", :type "Airbase", :id 19}
    {:x 3, :y 810, :owner 6, :name "Dzhonka Airport", :type "Airbase", :id 20}
    {:x 849, :y 316, :owner 6, :name "Vetrovoye Airbase", :type "Airbase", :id 21}
    {:x 6, :y 768, :owner 6, :name "Manoma", :type "Airbase", :id 22}
    {:x 7, :y 757, :owner 6, :name "Chuin Airport", :type "Airbase", :id 23}
    {:x 419, :y 542, :owner 6, :name "Dolinsk-Sokol Airbase", :type "Airbase", :id 24}
    {:x 363, :y 544, :owner 6, :name "Kostromskoye Airport", :type "Airbase", :id 25}
    {:x 795, :y 280, :owner 6, :name "Burevestnik Airport", :type "Airbase", :id 26}
    {:x 448, :y 471, :owner 6, :name "Ozerskiy Airport", :type "Airbase", :id 28}
    {:x 426, :y 480, :owner 6, :name "Novaya Airport", :type "Airbase", :id 29}
    {:x 110, :y 531, :owner 6, :name "Samarga Airport", :type "Airbase", :id 30}
    {:x 298, :y 79, :owner 2, :name "Okadama Airport", :type "Airbase", :id 159}
    {:x 450, :y 51, :owner 2, :name "Tokachi-Obihiro Airport", :type "Airbase", :id 160}
    {:x 385, :y 145, :owner 2, :name "Asahikawa Airport", :type "Airbase", :id 161}
    {:x 528, :y 73, :owner 2, :name "Kushiro Airport", :type "Airbase", :id 162}
    {:x 587, :y 132, :owner 2, :name "Nakashibetsu Airport", :type "Airbase", :id 164}
    {:x 528, :y 163, :owner 2, :name "Memanbetsu Airbase", :type "Airbase", :id 166}
    {:x 468, :y 205, :owner 2, :name "Monbetsu Airbase", :type "Airbase", :id 167}
    {:x 341, :y 325, :owner 6, :name "Wakkanai Air Station", :type "Airbase", :id 169}
    {:x 293, :y 313, :owner 6, :name "Rishiri Airport", :type "Airbase", :id 170}
    {:x 327, :y 44, :owner 2, :name "New Chitose Airport", :type "Airbase", :id 158}
    {:x 414, :y 499, :owner 6, :name "Yuzhno-Sakhalinsk Airport", :type "Airbase", :id 27}]})
