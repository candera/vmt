(ns weathergen.database.korea)

(def theater-info
  {:owners
   {0 "XX"
    1 "US"
    2 "ROK"
    3 "Japan"
    4 "CIS"
    5 "PRC"
    6 "DPRK"
    7 "Gorn"}

   :size [1024 1024]

   :mapping {:left      [123 0]
             :top       [43 3]
             :bottom    [33 50]
             :top-right [135 35]}
   :objectives
   ;; Some of these were edited by hand, unfortunately. The TacEdit
   ;; CSV export spit out "0" for a name for a lot of them. I think
   ;; maybe those names are kept in some other section of the file
   ;; somehow.
   [{:x 398, :y 236, :owner 2, :name "Kunsan Airbase" :type "Airbase" :id 2663}
    {:x 254, :y 926, :owner 5, :name "Liuhe Airbase", :type "Airbase", :id 2611}
    {:x 51, :y 899, :owner 5, :name "Shenyang Airbase", :type "Airbase", :id 2608}
    {:x 896, :y 1019, :owner 4, :name "Nachodka Airbase", :type "Airbase", :id 2604}
    {:x 908, :y 90, :owner 1, :name "Kadena Airbase", :type "Airbase", :id 52}
    {:x 680, :y 155, :owner 2, :name "Pusan Airbase", :type "Airbase", :id 2396}
    {:x 577, :y 767, :owner 6, :name "Hwangsuwon Airbase", :type "Airbase", :id 1824}
    {:x 623, :y 474, :owner 2, :name "Sokcho", :type "Airbase", :id 1570}
    {:x 415, :y 331, :owner 2, :name "R110 Airstrip", :type "Airstrip", :id 1397}
    {:x 386, :y 317, :owner 2, :name "Seosan Airbase", :type "Airbase", :id 1396}
    {:x 499, :y 309, :owner 2, :name "Chongwon Airfield", :type "Airstrip", :id 1394}
    {:x 475, :y 309, :owner 2, :name "R505 Airstrip", :type "Airstrip", :id 1393}
    {:x 450, :y 347, :owner 2, :name "Pyeongtaeg Airbase", :type "Airbase", :id 1392}
    {:x 459, :y 341, :owner 2, :name "Songwhan Highway Strip", :type "Airstrip", :id 1391}
    {:x 573, :y 317, :owner 2, :name "R601 Airstrip", :type "Airstrip", :id 1389}
    {:x 580, :y 263, :owner 2, :name "Kumi Highway Strip", :type "Airstrip", :id 1388}
    {:x 594, :y 317, :owner 2, :name "Yechon Airbase", :type "Airbase", :id 1387}
    {:x 616, :y 335, :owner 2, :name "Yongju Highway Strip", :type "Airstrip", :id 1386}
    {:x 546, :y 350, :owner 2, :name "Choongwon Airbase", :type "Airbase", :id 1385}
    {:x 657, :y 439, :owner 2, :name "Kangnung Airbase", :type "Airbase", :id 1384}
    {:x 579, :y 371, :owner 2, :name "R605 Airstrip", :type "Airstrip", :id 1383}
    {:x 547, :y 429, :owner 2, :name "R419 Airstrip", :type "Airstrip", :id 1382}
    {:x 448, :y 449, :owner 2, :name "R222 Airstrip", :type "Airstrip", :id 1381}
    {:x 466, :y 459, :owner 2, :name "R217 Airstrip", :type "Airstrip", :id 1380}
    {:x 522, :y 451, :owner 2, :name "Chuncheon Airstrip", :type "Airstrip", :id 1379}
    {:x 445, :y 469, :owner 2, :name "R218 Airstrip", :type "Airstrip", :id 1377}
    {:x 434, :y 470, :owner 2, :name "Mandumi Airstrip", :type "Airbase", :id 1376}
    {:x 424, :y 431, :owner 2, :name "R113 Highway Strip", :type "Airstrip", :id 1375}
    {:x 454, :y 387, :owner 2, :name "Singal Highway Strip", :type "Airstrip", :id 1374}
    {:x 394, :y 437, :owner 2, :name "R107 Airstrip", :type "Airstrip", :id 1373}
    {:x 316, :y 467, :owner 6, :name "Haeju Airbase", :type "Airbase", :id 1372}
    {:x 265, :y 461, :owner 6, :name "Ongjin Airbase", :type "Airbase", :id 1371}
    {:x 249, :y 479, :owner 6, :name "Taetan Airbase", :type "Airbase", :id 1370}
    {:x 236, :y 493, :owner 6, :name "Changyon Highway Strip", :type "Airstrip", :id 1369}
    {:x 216, :y 512, :owner 6, :name "Kwail Airbase", :type "Airbase", :id 1368}
    {:x 238, :y 569, :owner 6, :name "Onch'on Airbase", :type "Airbase", :id 1367}
    {:x 332, :y 561, :owner 6, :name "Sangwon Highway Strip", :type "Airstrip", :id 1366}
    {:x 360, :y 493, :owner 6, :name "Nuch'on-ni Highway Strip", :type "Airstrip", :id 1364}
    {:x 393, :y 551, :owner 6, :name "Koksan Airbase", :type "Airbase", :id 1363}
    {:x 398, :y 551, :owner 6, :name "Koksan Highway Strip", :type "Airstrip", :id 1362}
    {:x 512, :y 550, :owner 6, :name "Hoeyang SE Highway Strip", :type "Airstrip", :id 1361}
    {:x 488, :y 539, :owner 6, :name "Hyon-Ni Airbase", :type "Airbase", :id 1360}
    {:x 416, :y 502, :owner 6, :name "Taebukpo-ri Airstrip", :type "Airstrip", :id 1357}
    {:x 536, :y 559, :owner 6, :name "Kojo Highway Strip", :type "Airstrip", :id 1353}
    {:x 742, :y 882, :owner 6, :name "Sugam-ni Airstrip", :type "Airstrip", :id 1352}
    {:x 733, :y 863, :owner 6, :name "Kyongsong Chuul Airstrip", :type "Airstrip", :id 1351}
    {:x 644, :y 732, :owner 6, :name "Tangch'on Highway Strip", :type "Airstrip", :id 1350}
    {:x 630, :y 731, :owner 6, :name "Iwon Airbase", :type "Airbase", :id 1349}
    {:x 476, :y 635, :owner 6, :name "Yonghung Highway Strip", :type "Airstrip", :id 1348}
    {:x 496, :y 598, :owner 6, :name "Wonsan Airbase", :type "Airbase", :id 1347}
    {:x 474, :y 610, :owner 6, :name "Okpyong-Ni Airstrip", :type "Airstrip", :id 1346}
    {:x 494, :y 662, :owner 6, :name "Sondok Airbase", :type "Airbase", :id 1342}
    {:x 510, :y 692, :owner 6, :name "Toksan Airbase", :type "Airbase", :id 1341}
    {:x 315, :y 581, :owner 6, :name "Mirim Airbase", :type "Airbase", :id 1340}
    {:x 318, :y 623, :owner 6, :name "Sunch'on Airbase", :type "Airbase", :id 1339}
    {:x 309, :y 669, :owner 6, :name "Yongbyon Airstrip", :type "Airstrip", :id 1338}
    {:x 316, :y 662, :owner 6, :name "Kaech'on Airbase", :type "Airbase", :id 1337}
    {:x 271, :y 681, :owner 6, :name "T'aech'on Airbase", :type "Airbase", :id 1336}
    {:x 236, :y 678, :owner 6, :name "Panghyon Airstrip", :type "Airstrip", :id 1335}
    {:x 234, :y 655, :owner 6, :name "Kwaksan Airstrip", :type "Airstrip", :id 1334}
    {:x 198, :y 662, :owner 6, :name "Sonch'on Airstrip", :type "Airstrip", :id 1333}
    {:x 624, :y 236, :owner 2, :name "Taegu Airbase", :type "Airbase", :id 1326}
    {:x 424, :y 152, :owner 2, :name "Kwangju Airbase", :type "Airbase", :id 1315}
    {:x 498, :y 329, :owner 2, :name "Chongju Airbase", :type "Airbase", :id 1312}
    {:x 549, :y 402, :owner 2, :name "Hoengsong", :type "Airbase", :id 1310}
    {:x 242, :y 683, :owner 6, :name "Panghyon Airbase", :type "Airbase", :id 1188}
    {:x 290, :y 603, :owner 6, :name "Sunan Airbase", :type "Airbase", :id 1099}
    {:x 452, :y 401, :owner 2, :name "Seoul Airbase", :type "Airbase", :id 1056}
    {:x 415, :y 418, :owner 2, :name "Kimpo Airbase", :type "Airbase", :id 1055}
    {:x 324, :y 496, :owner 6, :name "Ayang-Ni Highway Strip", :type "Airstrip", :id 833}
    {:x 307, :y 543, :owner 6, :name "Hwangju Airbase", :type "Airbase", :id 832}
    {:x 439, :y 380, :owner 2, :name "Suwon Airbase", :type "Airbase", :id 830}
    {:x 445, :y 358, :owner 2, :name "Osan Airbase", :type "Airbase", :id 828}
    {:x 543, :y 563, :owner 6, :name "Kuum-ni Airbase", :type "Airbase", :id 791}
    {:x 734, :y 848, :owner 6, :name "Orang Airbase", :type "Airbase", :id 444}
    {:x 698, :y 795, :owner 6, :name "Kilchu Highway Strip", :type "Airstrip", :id 439}
    {:x 654, :y 152, :owner 2, :name "Kimhae International", :type "Airbase", :id 144}
    {:x 702, :y 245, :owner 2, :name "Pohang Airbase", :type "Airbase", :id 73}
    {:x 561, :y 143, :owner 2, :name "Sachon Airbase", :type "Airbase", :id 72}
    {:x 320, :y 644, :owner 6, :name "Pukch'ang-up Airbase", :type "Airbase", :id 71}
    {:x 171, :y 713, :owner 6, :name "Uiju Airbase", :type "Airbase", :id 70}
    {:x 472, :y 731, :owner 6, :name "Changjin Airbase", :type "Airbase", :id 69}
    {:x 597, :y 899, :owner 6, :name "Samjiyon-up Airbase", :type "Airbase", :id 68}
    {:x 372, :y 818, :owner 6, :name "Manp'o Airbase", :type "Airbase", :id 67}
    {:x 410, :y 404, :owner 2, :name "East Incheon Airstrip", :type "Airstrip", :id 66}
    {:x 290, :y 509, :owner 6, :name "Ok-Tong Airstrip", :type "Airstrip", :id 65}
    {:x 308, :y 522, :owner 6, :name "Pongsan Airstrip", :type "Airstrip", :id 64}
    {:x 380, :y 509, :owner 6, :name "P'yongsan Airstrip", :type "Airstrip", :id 63}
    {:x 384, :y 489, :owner 6, :name "Kumch'on Airstrip", :type "Airstrip", :id 62}
    {:x 422, :y 530, :owner 6, :name "Ich'on Airstrip", :type "Airstrip", :id 61}
    {:x 532, :y 553, :owner 6, :name "Kongse-dong Airstrip", :type "Airstrip", :id 60}]})
