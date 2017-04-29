function package () {
    boot electron
    rm -rf package/
    mkdir -p package/
    ELECTRON_VERSION=$(electron --version | cut -d v -f 2)
    echo "Using Electron version ${ELECTRON_VERSION}"
    electron-packager target/ --electron-version=$ELECTRON_VERSION --out package/ --overwrite --platform=darwin --icon "assets/images/1stVFW_Insignia.icns"
    electron-packager target/ --electron-version=$ELECTRON_VERSION --out=package/ --overwrite --platform=win32 --arch=ia32,x64 --icon="assets/images/1stVFW_Insignia.ico" #--asar=true

}
