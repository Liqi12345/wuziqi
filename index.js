
let qipan = $('.qipan');
let flag = true;
let hei = {},bai = {},blank = {},ai = true;
for(let i = 0; i < 15;i++){
    qipan.append('<i>');
    qipan.append('<b>');
    for(let j = 0; j < 15; j++){

        blank[i+'_'+j] = true; //定义空白位置
        $('<span>').appendTo(qipan).addClass('qizi')
        .data('pos',{x:i,y:j})
        .attr('id',i+'_'+j);
    }
}

qipan.on('click','.qizi',function(){
    if($(this).hasClass('hei') || $(this).hasClass('bai')){
        return;
    }
    // delete blank[data.x+'_'+data.y];
    //console.log($(this).attr('id'));
    let data = $(this).data('pos');
   delete blank[data.x+'_'+data.y]; //删除空白位置
        if(flag){
        $(this).addClass('hei');
        hei[data.x + '_'+data.y] = true;
            if(success(data,hei) >= 5){
                console.log('hei');
                qipan.off();
                return;
            }

        if(ai){
            let obj = position();
            $('#'+ obj.x+'_'+obj.y).addClass('bai');
               bai[obj.x + '_'+obj.y] = true;
            delete blank[obj.x+'_'+obj.y]; //删除空白位置
                if(success(obj,bai) >= 5){
                    console.log('bai');
                    qipan.off();
                }
            return;
        }
    }else{
        $(this).addClass('bai')
       bai[data.x + '_'+data.y] = true;
        if(success(data,bai) == 5){
            console.log('bai');
            qipan.off();
        }
    }
    flag = !flag;
});
function position(){
    let s1 = 0,s2 = 0,p1 = null,p2 = null;
    for(let i in blank){
        let arr = {x:i.split('_')[0],y:i.split('_')[1]};

        if(success(arr,hei) > s1){
            s1 = success(arr,hei); //
            // console.log(s1)
            // console.log(arr)
            p1 = arr;
        }
        if(success(arr,bai) > s2){
            s2 = success(arr,bai);
            p2 = arr;
        }

    }
   return s1 > s2 ? p1 : p2;

}



function success(data,obj){
   hen = 1; shu = 1; zx = 1; yx = 1;
   let x = data.x,y = data.y;

  while(obj[(++x) + '_'+ y]){
      hen++;
  }
    x = data.x;
  while(obj[(--x) + '_'+ y]){
     hen++;
  }
    x = data.x;
  while(obj[x + '_'+(++y)]){
      shu++;
  }
  y = data.y;
  while(obj[x + '_'+(--y)]){
      shu++;
  }
    y = data.y;
  while(obj[(++x)+ '_' +(++y)]){
      yx++;
  }
    x = data.x;y = data.y;
  while(obj[(++x)+ '_' +(--y)]) {
      yx++;
  }
    x = data.x;y = data.y;
  while(obj[(--x)+ '_' +(--y)]){
      zx++;
  }
  x = data.x;y = data.y;
  while(obj[(--x)+ '_' +(++y)]) {
      zx++;
  }
  return Math.max(hen,shu,zx,yx)
}


