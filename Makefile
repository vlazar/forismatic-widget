widget:
	cp -R src/ forismatic/
	cp LICENSE forismatic/
	cd forismatic; zip -r -9 ../dist/forismatic.wgt ./* -x **/.DS_Store
	rm -rf forismatic

.PHONY: widget
