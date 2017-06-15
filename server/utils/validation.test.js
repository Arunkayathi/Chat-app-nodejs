const expect=require('expect');
const {isRealString}=require('./validation');

describe('isRealString',()=>{

    it('Should reject non-string values',()=>{

        var checkString=isRealString(123);

        expect(checkString).toBe(false);
    });
    it('Should reject with only spaces',()=>{

        var checkString=isRealString('   ');

        expect(checkString).toBe(false);
    });
    it('Should reject non-space characters',()=>{

        var checkString=isRealString('   andrew   ');

        expect(checkString).toBe(true);
    });

});
