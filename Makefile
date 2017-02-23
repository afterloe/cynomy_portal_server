.PHONY: check,mocha-test,test,compile-js,build,move,install

PATH := ./node_modules/.bin:$(PATH)
SHELL := /bin/bash
MOCHA_FILES := $(shell find ./test -name '*_test.js')
LIB := node_modules
FILELIST := bin config dao distributed doc errors interceptors lib routers servers services template tools webPage History.md index.js INSTALL.md LICENSE package.json README.md Makefile
TMPDIR := /tmp/portal-server

# 轮询指令
all: check mocha-test

# 测试指令
test: mocha-test test-cov

# 构建指令
build: check move compile-js cleanCompile

# 检测代码是否符合标准
check: $(shell find . -name '*.js' ! -path './node_modules/*' ! -path './coverage/*' ! -path './mochawesome-reports/*' ! -path './webPage/*' ! -path './tools/webTools/*')
	@jshint $^

# mocha测试
mocha-test: $(MOCHA_FILES)
	@mocha $^ --reporter mochawesome

# 清除
clean: lib-cov
	@rm -rf test-cov

# 测试覆盖率
test-cov: $(MOCHA_FILES)
	@istanbul cover node_modules/.bin/_mocha $^ -R spec

# 安装
install:
	cnpm install --production

# 移动文件
move:
	@[ -d $(TMPDIR) ] && rm -rf $(TMPDIR)
	@mkdir -p $(TMPDIR)
	@cp -R $(FILELIST) $(TMPDIR)

# 编译js
compile-js:
	@babel webPage/js/portal/src -d $(TMPDIR)/webPage/js/portal/bin
	@babel tools/webTools/lib/src -d $(TMPDIR)/tools/webTools/lib/bin

cleanCompile:
	@rm -rf $(TMPDIR)/webPage/js/portal/src
	@rm -rf $(TMPDIR)/tools/webTools/lib/src
