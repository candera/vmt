#include <math.h>
#include <stdio.h>

/*--------------------*/
/* Physical Constants */
/*--------------------*/
#define RTD                     57.2957795F
#define DTR                     0.01745329F
#define VIS_RANGE               50000.0F
#define BIGGEST_RANDOM_NUMBER   32767.0F
#define BOLTZ                   1.38E-23
#ifndef PI
#define PI                      3.141592654F
#endif
#define HALF_PI 1.570796326795F
#define FOUR_PI_CUBED           1984.402F
#define FT_TO_METERS            0.30488F
#define FT_TO_NM                0.0001646F
#define FT_TO_KM 0.0003048F
#define NM_TO_FT                6076.211F
#define KM_TO_FT FEET_PER_KM       /* This define is also in constant.h */
#define NM_TO_KM 1.85224731f
#define KM_TO_NM 0.53988471f
#define FIVE_G_TURN_RATE        15.9F
#define LIGHTSPEED              983319256.3F      /* feet per sec */
#define TASL                    518.7F
#define PASL                    2116.22F
#define RHOASL                  0.0023769F
#define AASL                    1116.44F
#define AASLK                   661.48F
#define GRAVITY                 32.177F
#define FTPSEC_TO_KNOTS         0.592474F
#define KNOTS_TO_FTPSEC         1.687836F
#define MILS_TO_DEGREES         0.057296F
#define DTMR                    17.45F
#define MRTD                    0.057296F
#define RTMR                    1000.0F
#define MRTR                    0.001F
#define KPH_TO_FPS              0.9111053F
#define EARTH_RADIUS_NM   3443.92228F //Mean Equatorial Radius
#define EARTH_RADIUS_FT   2.09257E7F //Mean Equatorial Radius
#define NM_PER_MINUTE   1.00018F //Nautical Mile per Minute of Latitude (Or Longitude at Equator)
#define MINUTE_PER_NM   0.99820F //Minutes of Latitude (or Longitude at Equator) per NM
#define FT_PER_MINUTE   6087.03141F //Feet per Minute of Latitude (Or Longitude at Equator) 
#define MINUTE_PER_FT   1.64283E-4F //Minutdes of Latitude (or Longitude at Equator) per foot
#define FT_PER_DEGREE   FT_PER_MINUTE * 60.0F

#define DEG_TO_MIN   60
#define MIN_TO_DEG   0.01666666F

#define MIN_TO_SEC   DEG_TO_MIN
#define SEC_TO_MIN   MIN_TO_DEG

#define DEG_TO_SEC   3600
#define SEC_TO_DEG   2.7777777E-4F

#define SEC_TO_MSEC             1000
#define MSEC_TO_SEC             0.001f


float get_air_speed(float speed, int altitude)
{
    float rsigma, pa, mach, qc, qpasl1, vcas, oper, ttheta;

    if (altitude <= 36089)
    {
        ttheta = 1.0F - 0.000006875F * altitude;
        rsigma = static_cast<float>(pow(ttheta, 4.256F));
    }
    else
    {
        ttheta = 0.7519F;
        rsigma = static_cast<float>(0.2971F * pow(2.718F, 0.00004806F * (36089.0F - altitude)));
    }

    mach = static_cast<float>(speed / (sqrt(ttheta) * AASLK));
    pa  = ttheta * rsigma * PASL;

    if (mach <= 1.0F)
    {
        qc = ((float)pow((1.0F + 0.2F * mach * mach), 3.5F) - 1.0F) * pa;
    }
    else
    {
        qc = static_cast<float>(((166.9 * mach * mach) / 
                                 (float)(pow((7.0F - 1.0F / (mach * mach)), 
                                             2.5F))
                                 - 1.0F)
                                * pa);
    }

    printf("qc: %f\n", qc);
    
    qpasl1 = qc / PASL + 1.0F;
    vcas = static_cast<float>(1479.12F * sqrt(pow(qpasl1, 0.285714F) - 1.0F));

    if (qc > 1889.64F)
    {
        oper = static_cast<float>(qpasl1 * pow((7.0F - AASLK * AASLK / (vcas * vcas)), 2.5F));

        // sfr: holy shit, is this correct?
        if (oper < 0.0F) oper = 0.1F;

        {
            vcas = static_cast<float>(51.1987F * sqrt(oper));
        }
    }

    return vcas;
}

int main() {

  for (float alt = 0.0F; alt < 50000.0F; alt += 5000.0F) {
    for (float spd = 100.0F; spd < 1000.0F; spd += 100.0F) {
      printf("%10.0fkts, %10.0fft: %5.1f\n", spd, alt, get_air_speed(spd, alt));
    }
  }
}
