function build() {
    TARGETDIR=$1
    boot electron
    cd $TARGETDIR
    # Annoyingly, it seems that if I don't do an `npm install`, the
    # node_modules directory in the target does not get populated, and
    # electron-packager does not subsequently include modules in the
    # package, which causes a runtime error.
    npm install
    cd ..
}

function package () {
    TARGETDIR=$1
    DESTINATION=$2
    PLATFORM=$3
    ARCH=$4
    BUILDINFO=$5

    if [[ "$PLATFORM" = "darwin" ]]; then
        ICON="assets/images/vmt.icns"
    else
        ICON="assets/images/vmt.ico"
    fi

    if [[ -r $BUILDINFO ]]
    then
        cp $BUILDINFO $TARGETDIR/build.txt
    fi

    ELECTRON_VERSION=$(electron --version | cut -d v -f 2)
    echo "Using Electron version ${ELECTRON_VERSION}"
    electron-packager $TARGETDIR --electron-version=$ELECTRON_VERSION --out=$DESTINATION --overwrite --platform=$PLATFORM --arch=$ARCH --icon $ICON
}
