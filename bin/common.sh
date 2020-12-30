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

    if [[ -r $BUILDINFO ]]
    then
        cp $BUILDINFO $TARGETDIR/build.txt
    fi

    if [[ $PLATFORM == "win32" ]]
    then
      PLATFORM_SWITCH=--windows
    elif [[ $PLATFORM == "linux" ]]
    then
      PLATFORM_SWITCH=--linux
    else
      PLATFORM_SWITCH=--mac
    fi

    if [[ $ARCH == "ia32" ]]
    then
      ARCH_SWITCH=--ia32
    else
      ARCH_SWITCH=--x64
    fi
    
    # ELECTRON_VERSION=$(npm exec -- electron --version | cut -d v -f 2)
    # echo "Using Electron version ${ELECTRON_VERSION}"
    # npm exec -- electron-packager $TARGETDIR --electron-version=$ELECTRON_VERSION --out=$DESTINATION --overwrite --platform=$PLATFORM --arch=$ARCH --icon $ICON
    npm exec -- electron-builder -c.directories.output=$DESTINATION $PLATFORM_SWITCH $ARCH_SWITCH
}
