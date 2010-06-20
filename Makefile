widget:
	cp -R src/ forismatic/
	cp LICENSE forismatic/
	zip -r -9 dist/forismatic.wgt forismatic/ -x forismatic/.DS_Store
	rm -rf forismatic

.PHONY: widget
