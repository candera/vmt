(ns weathergen.database.israel
  "Data about ITO")

(def theater-info
  {:owners
   {0 "Hezbollah"
    1 "NATO"
    2 "Israel"
    3 "PA"
    4 "Jordan"
    5 "Syria"
    6 "Egypt"
    7 "Saudi Arabia"}

   :size [1024 1024]

   :mapping {:left      [29 33.64]
             :top       [34 49.20]
             :bottom    [25 37.39]
             :top-right [40 45.64]}
   :objectives
   [{:x 809, :y 296, :owner "Saudi Arabia", :name "Qalibha", :type "Airstrip"}
    {:x 630, :y 391, :owner "Saudi Arabia", :name "Al Bir", :type "Airstrip"}
    {:x 553, :y 487, :owner "Jordan", :name "Al Quwayhra", :type "Airstrip"}
    {:x 631, :y 632, :owner "Jordan", :name "Al Qantranah", :type "Airstrip"}
    {:x 712, :y 681, :owner "Jordan", :name "Al Gadhaf", :type "Airstrip"}
    {:x 630, :y 692, :owner "Jordan", :name "Highway H", :type "Airstrip"}
    {:x 650, :y 717, :owner "Jordan", :name "Azraq", :type "Airstrip"}
    {:x 921, :y 795, :owner "Jordan", :name "Wadi El Murbha", :type "Airstrip"}
    {:x 950, :y 812, :owner "Saudi Arabia", :name "H 3", :type "Airstrip"}
    {:x 682, :y 987, :owner "Syria", :name "Al Qusayr", :type "Airbase"}
    {:x 586, :y 940, :owner "Syria", :name "Alat", :type "Airbase"}
    {:x 699, :y 925, :owner "Syria", :name "An Nasariyah", :type "Airbase"}
    {:x 561, :y 902, :owner "Syria", :name "Rafic Hariri Intl", :type "Airbase"}
    {:x 502, :y 714, :owner "Israel", :name "Ben Gurion", :type "Airbase"}
    {:x 445, :y 641, :owner "PA", :name "Yasser Arafat Intl", :type "Airbase"}
    {:x 663, :y 861, :owner "Syria", :name "Damascus INT", :type "Airbase"}
    {:x 692, :y 892, :owner "Syria", :name "Dumyar", :type "Airbase"}
    {:x 738, :y 644, :owner "Saudi Arabia", :name "Guriat", :type "Airbase"}
    {:x 984, :y 828, :owner "Saudi Arabia", :name "H 3 North West", :type "Airbase"}
    {:x 986, :y 791, :owner "Saudi Arabia", :name "H 3 South", :type "Airbase"}
    {:x 839, :y 778, :owner "Jordan", :name "H 4", :type "Airbase"}
    {:x 473, :y 637, :owner "Israel", :name "Hatzerim", :type "Airbase"}
    {:x 487, :y 685, :owner "Israel", :name "Hatzor", :type "Airbase"}
    {:x 659, :y 824, :owner "Syria", :name "Kalhalhak", :type "Airbase"}
    {:x 619, :y 706, :owner "Jordan", :name "King Abdullha Ben", :type "Airbase"}
    {:x 633, :y 553, :owner "Jordan", :name "King Faisal", :type "Airbase"}
    {:x 643, :y 760, :owner "Jordan", :name "King Hussein", :type "Airbase"}
    {:x 662, :y 875, :owner "Syria", :name "Mezze", :type "Airbase"}
    {:x 506, :y 494, :owner "Israel", :name "Ovda", :type "Airbase"}
    {:x 851, :y 990, :owner "Syria", :name "Palmyr", :type "Airbase"}
    {:x 730, :y 729, :owner "Jordan", :name "Prince Hassan", :type "Airbase"}
    {:x 614, :y 701, :owner "Jordan", :name "Queen Alia INT", :type "Airbase"}
    {:x 532, :y 782, :owner "Israel", :name "Ramat David", :type "Airbase"}
    {:x 609, :y 897, :owner "Syria", :name "Riyaq", :type "Airbase"}
    {:x 490, :y 730, :owner "Israel", :name "Sde Dov", :type "Airbase"}
    {:x 717, :y 963, :owner "Syria", :name "Shayrat", :type "Airbase"}
    {:x 685, :y 345, :owner "Saudi Arabia", :name "Prince Sultan Bin Abdulaziz", :type "Airbase"}
    {:x 485, :y 694, :owner "Israel", :name "Tel Nof", :type "Airbase"}
    {:x 774, :y 971, :owner "Syria", :name "Tiyas", :type "Airbase"}
    {:x 886, :y 675, :owner "Saudi Arabia", :name "Turaif", :type "Airbase"}
    {:x 670, :y 126, :owner "Saudi Arabia", :name "Wejh", :type "Airbase"}
    {:x 581, :y 947, :owner "Syria", :name "Wujah Al Hajar", :type "Airbase"}
    {:x 328, :y 392, :owner "Egypt", :name "Abu Rudies", :type "Airbase"}
    {:x 146, :y 622, :owner "Egypt", :name "Al Mansurha", :type "Airbase"}
    {:x 200, :y 617, :owner "Egypt", :name "Al Manzilah", :type "Airbase"}
    {:x 94, :y 311, :owner "Egypt", :name "Al Minya", :type "Airbase"}
    {:x 66, :y 617, :owner "Egypt", :name "Al Rhamaniya", :type "Airbase"}
    {:x 167, :y 573, :owner "Egypt", :name "Al Zaqaziq", :type "Airbase"}
    {:x 219, :y 570, :owner "Egypt", :name "Alismaylia", :type "Airbase"}
    {:x 216, :y 604, :owner "Egypt", :name "As Salihiya", :type "Airbase"}
    {:x 99, :y 213, :owner "Egypt", :name "Aysut", :type "Airbase"}
    {:x 262, :y 617, :owner "Egypt", :name "Baluza", :type "Airbase"}
    {:x 101, :y 442, :owner "Egypt", :name "Ben Suef", :type "Airbase"}
    {:x 173, :y 549, :owner "Egypt", :name "Bilbays 2", :type "Airbase"}
    {:x 321, :y 549, :owner "Egypt", :name "Bir Gifgafa", :type "Airbase"}
    {:x 98, :y 604, :owner "Egypt", :name "Tanta", :type "Airbase"}
    {:x 130, :y 514, :owner "Egypt", :name "Cairo Almaza", :type "Airbase"}
    {:x 89, :y 519, :owner "Egypt", :name "Cairo West", :type "Airbase"}
    {:x 388, :y 616, :owner "Egypt", :name "El Arish", :type "Airbase"}
    {:x 379, :y 330, :owner "Egypt", :name "El Tor", :type "Airbase"}
    {:x 122, :y 523, :owner "Egypt", :name "Embaba", :type "Airbase"}
    {:x 57, :y 567, :owner "Egypt", :name "Gebel El Basur", :type "Airbase"}
    {:x 142, :y 489, :owner "Egypt", :name "Hulwan", :type "Airbase"}
    {:x 156, :y 548, :owner "Egypt", :name "Inshas", :type "Airbase"}
    {:x 27, :y 606, :owner "Egypt", :name "Jinkalis New", :type "Airbase"}
    {:x 247, :y 534, :owner "Egypt", :name "Kirban", :type "Airbase"}
    {:x 86, :y 474, :owner "Egypt", :name "Kom Awashim", :type "Airbase"}
    {:x 275, :y 57, :owner "Egypt", :name "Luxur", :type "Airbase"}
    {:x 225, :y 628, :owner "Egypt", :name "Port Said", :type "Airbase"}
    {:x 363, :y 293, :owner "Egypt", :name "Ras Jimsha New", :type "Airbase"}
    {:x 443, :y 311, :owner "Egypt", :name "Ras Nasrani", :type "Airbase"}
    {:x 327, :y 327, :owner "Egypt", :name "Ras Shukhayar New", :type "Airbase"}
    {:x 278, :y 471, :owner "Egypt", :name "Ras Sudr", :type "Airbase"}
    {:x 182, :y 521, :owner "Egypt", :name "Wadi Al Jandali", :type "Airbase"}
    {:x 209, :y 570, :owner "Egypt", :name "Abu Suwayr", :type "Airbase"}
    {:x 511, :y 470, :owner "Jordan", :name "Aqaba INT", :type "Airbase"}
    {:x 167, :y 547, :owner "Egypt", :name "Bilbays", :type "Airbase"}
    {:x 343, :y 537, :owner "Egypt", :name "Bir Hassana", :type "Airbase"}
    {:x 154, :y 518, :owner "Egypt", :name "Cairo INT", :type "Airbase"}
    {:x 233, :y 548, :owner "Egypt", :name "Faid", :type "Airbase"}
    {:x 1002, :y 805, :owner "Saudi Arabia", :name "H 3", :type "Airbase"}
    {:x 386, :y 217, :owner "Egypt", :name "Hurghada", :type "Airbase"}
    {:x 662, :y 852, :owner "Syria", :name "Marj Ruhayyil", :type "Airbase"}
    {:x 55, :y 54, :owner "Egypt", :name "New Valley", :type "Airbase"}
    {:x 114, :y 565, :owner "Egypt", :name "Quaswyina", :type "Airbase"}
    {:x 934, :y 763, :owner "Saudi Arabia", :name "Ruwayshid", :type "Airbase"}
    {:x 748, :y 888, :owner "Syria", :name "Sayqal", :type "Airbase"}
    {:x 691, :y 693, :owner "Jordan", :name "Shaheed Mwaffaq", :type "Airbase"}
    {:x 313, :y 153, :owner "Egypt", :name "Wadi Abu Shifat", :type "Airbase"}
    {:x 426, :y 620, :owner "Egypt", :name "El Gora", :type "Airbase"}
    {:x 421, :y 375, :owner "Egypt", :name "St Cathrine", :type "Airbase"}
    {:x 522, :y 634, :owner "Israel", :name "Nevatim", :type "Airbase"}
    {:x 478, :y 705, :owner "Israel", :name "Palmachim", :type "Airbase"}
    {:x 475, :y 589, :owner "Israel", :name "Ramon", :type "Airbase"}
    {:x 533, :y 775, :owner "Israel", :name "Megiddo", :type "Airstrip"}
    {:x 506, :y 469, :owner "Israel", :name "Eilat", :type "Airbase"}
    {:x 648, :y 794, :owner "Syria", :name "As Suwayda West", :type "Airbase"}
    {:x 305, :y 982, :owner "NATO", :name "Akrotiri", :type "Airbase"}
    {:x 573, :y 822, :owner "Israel", :name "Rosh Pina", :type "Airstrip"}]})
