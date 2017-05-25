/*
 * Copyright 2016 SPC Vietnam Co., Ltd.
 * All right reserved.
*/

/**
 * @Author: Nguyen Chat Hien
 * @Date:   2017-05-22 15:41:17
 * @Last Modified by:   Nguyen Chat Hien
 * @Last Modified time: 2017-05-25 11:38:16
 */

'use strict';
var app = angular.module('app',[]);

app.controller('myCtrl', ['$scope', '$http', function($scope, $http) {

    loadLogoAndColor();
    loadOrder();

    $scope.formInvalid = function(){

        var order = $scope.order;
        var result = order.cart.length < 1  || order.receiver == '' || order.phone == '' || order.address == '';

        return result;
    }

    $scope.selectColor = function(color) {

        $scope.colors.forEach(function(item) {
            item.isSelected = false;
        });

        color.isSelected = true;
        $scope.selectedColorId = color.id;
    };

    $scope.selectLogo = function(logo) {
        console.log(logo);
        $scope.logos.forEach(function(item) {
            item.isSelected = false;
        });
        logo.isSelected = true;
        $scope.selectedLogoId = logo.id;
    };

    $scope.selectTrademark = function(trademark) {
        console.log(trademark);
        $scope.trademarks.forEach(function(item) {
            item.isSelected = false;
        });
        trademark.isSelected = true;
        $scope.selectedTraIdemarkTitle = trademark.title;
    };

    $scope.remove = function(item) {
        var itemIndex = $scope.order.cart.indexOf(item);
        $scope.order.cart.splice(itemIndex, 1);
    };

    $scope.addToCart = function(type) {
        console.log(type);
        var item = {
            colorId: $scope.selectedColorId,
            logoId: $scope.selectedLogoId,
            name:   $scope.name,
            type: type,
            color: $scope.colors[$scope.selectedColorId - 1].description,
        };

        if (type == 'passport') {
            var logo = $scope.logos.filter(function(logo) {
                return logo.id == $scope.selectedLogoId
            })[0];

            item.logoImg = logo.img;
            item.logo = logo.description;
        };

        if(type == 'ví') {
            var trademark = $scope.trademarks.filter(function(trademark) {
                return trademark.title == $scope.selectedTraIdemarkTitle
            })[0];

            item.trademark = trademark.title;
        }

        $scope.order.cart.push(item);
    }

    $scope.submit = function() {
        if ($scope.order.cart.length < 1) return;

        // var apiLink = 'https://api.mongolab.com/api/1/databases/vuong_shop_order/collections/orders/?apiKey=Rds2DpkLY7_VqsMfmgfSo_EdzafbQvOs';
        var apiLink = 'https://api.mlab.com/api/1/databases/order_shop/collections/orders/?apiKey=rbs16Vz-cz0ioElX3qKGes7cTHuB-53f';
        $http.post(apiLink, $scope.order).then(function(rs) {
            var newId = rs.data._id['$oid'];
            var host = 'http://code4fun.biz';
            var link = host + 'order.html#/?id=' + newId;

            prompt("Bạn đã đặt hàng thành công, hãy gửi link đơn hàng này cho facebook shop.\nLink đơn hàng:", link);
        });
    };

    function loadOrder() {
        $scope.selectedColorId = 1;
        $scope.selectedLogoId = 1,
        $scope.selectedTraIdemarkTitle = 'channel',
        $scope.name = 'Hiển';
        $scope.order = {
            phone: '',
            note: '',
            address: '',
            cart: []
        };
        selectLogoColorAndTradeMark();
    }

    function loadLogoAndColor() {
        $scope.colors = [{
            id: 1,
            description: 'Xanh cốm'
        }, {
            id: 2,
            description: 'Vàng'
        }, {
            id: 3,
            description: 'Cam'
        }, {
            id: 4,
            description: 'Hồng'
        }, {
            id: 5,
            description: 'Da bò'
        }, {
            id: 6,
            description: 'Xám'
        }, {
            id: 7,
            description: 'Lục bảo'
        }, {
            id: 8,
            description: 'Xanh da trời'
        }, {
            id: 9,
            description: 'Nâu'
        }, {
            id: 10,
            description: 'Xanh đen'
        }, {
            id: 11,
            description: 'Đỏ'
        }, {
            id: 12,
            description: 'Đen'
        }, {
            id: 13,
            description: 'Xanh biển'
        }, {
            id: 14,
            description: 'Đỏ đô'
        }, {
            id: 15,
            description: 'Tím'
        }];

        $scope.trademarks = [{
            id: 0,
            description: 'none',
            title: 'none'
        },{
            id: 1,
            description: 'channel',
            title: 'channel'
        },{
            id: 2,
            description: 'DG',
            title: 'DG'
        },{
            id: 3,
            description: 'Guess',
            title: 'Guess'
        },{
            id: 4,
            description: 'pandora',
            title: 'pandora'
        }];

        $scope.logos = [{
            id: 0,
            description: 'Không charm',
            img: "0"
        },{
            id: 1,
            description: 'Cây',
            img: "1"
        }, {
            id: 2,
            description: 'Couple',
            img: "2"
        }, {
            id: 3,
            description: 'Cỏ 4 lá',
            img: "3"
        }, {
            id: 4,
            description: 'Bướm',
            img: "4"
        }, {
            id: 5,
            description: 'Râu',
            img: "5"
        }, {
            id: 6,
            description: 'Neo phao',
            img: "6"
        }, {
            id: 7,
            description: 'Xe đạp',
            img: "7"
        }, {
            id: 8,
            description: 'Vương miện',
            img: "8"
        }, {
            id: 9,
            description: 'Cú',
            img: '9'
                // }, {
                //     id: 10,
                //     description: 'Kính râu',
                //     img: '10'
                // }, {
                //     id: 11,
                //     description: 'Neo',
                //     img: '11'
        }, {
            id: 12,
            description: 'Tháp',
            img: '12_2'
        }, {
            id: 13,
            description: 'Maria',
            img: '13_2'
        }];
    }

    function selectLogoColorAndTradeMark() {
        $scope.colors.forEach(function(item) {
            item.isSelected = item.id == $scope.selectedColorId;
        });

        $scope.logos.forEach(function(item) {
            item.isSelected = item.id == $scope.selectedLogoId;
        });

        $scope.trademarks.forEach(function(item) {
            item.isSelected = item.title == $scope.selectedTraIdemarkTitle;
        });
    }

}]);
