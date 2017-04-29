function package () {
    boot electron
    cd target/
    # Annoyingly, it seems that if I don't do an `npm install`, the
    # node_modules directory in the target does not get populated, and
    # electron-packager does not subsequently include modules in the
    # package, which causes a runtime error.
    npm install
    cd ..
    rm -rf package/
    mkdir -p package/
    ELECTRON_VERSION=$(electron --version | cut -d v -f 2)
    echo "Using Electron version ${ELECTRON_VERSION}"
    electron-packager target/ --electron-version=$ELECTRON_VERSION --out package/ --overwrite --platform=darwin --icon "assets/images/1stVFW_Insignia.icns"
    electron-packager target/ --electron-version=$ELECTRON_VERSION --out=package/ --overwrite --platform=win32 --arch=ia32,x64 --icon="assets/images/1stVFW_Insignia.ico" #--asar=true

}
